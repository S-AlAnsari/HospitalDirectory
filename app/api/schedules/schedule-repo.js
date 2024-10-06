import fs from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class SchedulesRepo {
  constructor() {}
  async getSchedule() {
    try {
      return await prisma.schedule.findMany({
        include: {
          assignments:{
            include: {
              user:true
            }
          },
        },
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  async getScheduleById(id) {
    try {
      return await prisma.schedule.findMany({
        where: {
          id: +id,
        },
        include: {
          assignments: true,
        },
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  // async getPapersByStatus(status) {
  //   try {
  //     return await prisma.paper.findMany({
  //       where: {
  //         status: status,
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     process.exit(1);
  //   }
  // }
  // async getPapersByUserId(userId) {
  //   try {
  //     return await prisma.paper.findMany({
  //       where: {
  //         user_id: +userId,
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     process.exit(1);
  //   }
  // }

  // async getPaper(id) {
  //     try {
  //         const papers = await fs.readJson(this.path)
  //         const paper = papers.find(p => p.id == id)
  //         return paper
  //     }
  //     catch (error) {
  //         console.error(error)
  //         process.exit(1)
  //     }
  // }
  async addSchedule(schedule) {
    const newSchedule = await prisma.schedule.create({
      data: schedule,
    });
    return newSchedule;
  }
  async updateSchedule(schedule) {
    try {
      const updatedSchedule = await prisma.schedule.update({
        where: {
          id: schedule.id,
        },
        data: schedule,
      });
      return updatedSchedule;
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
