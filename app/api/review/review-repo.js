import fs from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class PapersRepo {
  constructor() {}
  async getReview(paperId) {
    try {
      if(paperId){
      return await prisma.review.findMany(
        {
          where: {
            paperId: +paperId,
          },
        }
      );
    }else{
      return await prisma.review.findMany();
    }
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
  async addReview(review) {
    const newReview = await prisma.review.create({
      data: review,
    });
    return newReview;
  }
  async updateReview(review) {
    try {
      const updatedReview = await prisma.review.update({
        where: {
          paperId: review.paperId,
        },
        data: review,
      });
      return updatedReview;
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
