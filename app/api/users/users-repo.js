import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class UsersRepo {
    constructor() {
    }
    async getUsers(email, role) {
        try {
            if (!email && !role) {
                return await prisma.user.findMany()
            } else if (email) {
                return await prisma.user.findUnique({
                    where: {
                        email
                    }
                })
            } else {
                return await prisma.user.findMany({
                    where: {
                        role
                    }
                })
            }
        }
        catch (error) {
            console.error(error)
            process.exit(1)
        }
    }
    async getUser(id, email) {
        try {
            if (!email) {
                return await prisma.user.findUnique({
                    where: {
                        id
                    }
                })
            } else {
                return await prisma.user.findUnique({
                    where: {
                        email
                    }
                })
            }
        }
        catch (error) {
            console.error(error)
            process.exit(1)
        }
    }

}