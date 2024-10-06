import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class AuthorsRepo {
    constructor() {
    }
    async getAuthors(email) {
        try {
            if (!email) {
                return await prisma.author.findMany()
            } else {
                return await prisma.author.findUnique({
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
    async getAuthor(id) {
        try {
            return await prisma.author.findUnique({
                where: {
                    id
                }
            })
        }
        catch (error) {
            console.error(error)
            process.exit(1)
        }
    }
    async addAuthor(author) {
        const newAuthor = await prisma.author.create({
            data: author
        })
        return newAuthor
    }
}