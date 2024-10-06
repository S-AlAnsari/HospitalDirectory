import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class UsersRepo {
    constructor() {}
    async getHospitals() {
      try {
        return await prisma.department.findMany({
          include: {
            hospital: true
          }
        });
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    }
    async getHospitalById(id) {
      try {
        return await prisma.department.findMany({
          where: {
            hospitalId: +id,
          },
          
          include: {
            hospital: true
          }
        });
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    }
}