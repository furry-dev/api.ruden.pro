import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await prisma.manga.create({
        data: {
            id: 2,
            year: 2016,
            status: "release",
            age_rating: "R_16",
            description: {
                create: {
                    text: "Desc 2",
                    langCodesId: 1
                }
            }
        }
    })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
