import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient({
  transactionOptions: {
    maxWait: 5000, // default: 2000
    timeout: 10000, // default: 5000
  }
})

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

    async createAssignment(schedule) {
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

    async updateAssignment(schedule) {
      try {
        let updatedSchedule;
        
        if (schedule.id) {
          // If the ID is present, attempt to update
          updatedSchedule = await prisma.scheduleAssignment.update({
            data: {
              ...schedule, // Spread to ensure only necessary fields are updated
            },
            where: {
              id: schedule.id
            }
          });
        } else {
          // If no ID, create a new entry
          updatedSchedule = await prisma.scheduleAssignment.create({
            data: schedule
          });
        }
    
        return updatedSchedule;
      } catch (error) {
        console.error("Error in updateOrCreateAssignment:", error);
        throw new Error("Unable to process assignment update or creation.");
      }
    }
}