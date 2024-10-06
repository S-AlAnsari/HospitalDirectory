import fs from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class PapersRepo {
  constructor() {}
  async getPapers(id) {
    try {
      if(id){
      return await prisma.paper.findMany({
        include: {
          written: {
            include: {
              author: true,
            },
          },
        },
        where: {
          id: +id}
      });
    }else{
      return await prisma.paper.findMany({
        include: {
          written: {
            include: {
              author: true,
            },
          },
        },
      });
    }
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  async getPapersByStatus(status) {
    try {
      return await prisma.paper.findMany({
        where: {
          status: status,
        },
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  async getPapersByUserId(userId) {
    try {
      return await prisma.paper.findMany({
        where: {
          user_id: +userId,
        },
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

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
  async addPaper(paper) {
    const newPaper = await prisma.paper.create({
      data: paper,
    });
    return newPaper;
  }
  async updatePaper(paper) {
    try {
      const updatedPaper = await prisma.paper.upsert({
        where: {
          id: paper.id,
        },
        update: paper,
        create: paper,
      });
      return updatedPaper;
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
