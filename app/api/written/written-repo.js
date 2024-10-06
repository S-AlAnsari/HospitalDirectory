import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class WrittenRepo {
  constructor() {}

  async getWritten(paperId) {
    try {
      if (paperId) {
        return await prisma.written.findMany({
          where: {
            paperId: +paperId,
          },
        });
      } else {
        return await prisma.written.findMany();
      }
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }

  async addWritten(written) {
    const newWritten = await prisma.written.create({
      data: written,
    });
    return newWritten;
  }

  async getAuthors() {
    try {
      let avg = await prisma.written.aggregate({
        _avg: {
          authorId: true,
        },
      });
      return avg;
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
