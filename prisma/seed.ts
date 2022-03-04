import { PrismaClient, Role } from '@prisma/client'
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

async function main() {
    const admin = await prisma.user.upsert({
        where: {
            username: "admin"
        },
        update: {
            password: bcrypt.hashSync("123456", 10),
        },
        create: {
            name: "Admin",
            email: "admin@nnu.com",
            username: "admin",
            password: bcrypt.hashSync("123456", 10),
            role: Role.ADMIN,
        }
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })