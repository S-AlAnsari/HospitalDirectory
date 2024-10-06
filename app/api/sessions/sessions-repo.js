import fs from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class SessionsRepo {
  constructor() {}
  async getSessions() {
    try {
      return await prisma.session.findMany();
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
  async addSession(session) {
    if (!session.id) {
      const newSession = await prisma.session.create({
        data: session,
      });
      return newSession;
    } else {
      const updatedSession = await prisma.session.update({
        where: {
          id: session.id,
        },
        data: session,
      });
      return updatedSession;
    }
  }
  async updateSession(session) {
    try {
      if (session.id) {
        const updatedSession = await prisma.session.update({
          where: {
            id: session.id,
          },
          data: session,
        });
        return updatedSession;
      } else {
        this.addSession(session);
      }
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  async getCount() {
    try {
      return await prisma.session.count();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
