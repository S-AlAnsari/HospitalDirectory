import fs from "fs-extra";
import path from "path";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class DatesRepo {
  constructor() {}
  async getDates() {
    try {
      return await prisma.date.findMany();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
  async getDateById(id) {
    try {
      return await prisma.date.findMany({
        where: {
          id: +id,
        },
      });
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}
