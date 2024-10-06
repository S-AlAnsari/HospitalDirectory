import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class UsersRepo {
    constructor() {}
    async getAssignments() {
      try {
        return await prisma.scheduleAssignment.findMany();
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    }
    async getAssignmentByDepartmentId(id) {
      try {
        return await prisma.scheduleAssignment.findMany({
          where: {
            departmentId: +id,
          }, include: {
            user: true}
        });
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    }
}