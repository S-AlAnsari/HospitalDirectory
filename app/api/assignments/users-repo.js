import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class UsersRepo {
    constructor() {}
    async getAssignments() {
      try {
        return await prisma.scheduleAssignment.findMany({
         include: {
          department: true,
          user:true
         }
        });
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
            user: true,
            department: true
            }
        });
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    }

    async updateSchedule(schedule) {
      try {
        const updatedSchedule = await prisma.scheduleAssignment.create({
          data: schedule,
        });
        return updatedSchedule;
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    }
}