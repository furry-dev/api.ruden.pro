import {extendType, intArg, nonNull, objectType, stringArg} from "nexus"
import {NexusGenObjects} from "../nexus-typegen"


let mangas: NexusGenObjects["Manga"][] = [
    {
        id: 1,
        year: 2019,
        title: "I gave my first time to my brother",
        cover: "manga-cover_1.webp",
        description: "Desc 1",
        added: "26.03.2024"
    },
    {
        id: 2,
        year: 2016,
        title: "My first time with... my little sister!?",
        cover: "manga-cover_2.webp",
        description: "Desc 2",
        added: "03.07.2018"
    }
]

export const Manga = objectType({
    name: "Manga",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.string("title")
        t.nonNull.string("cover")
        t.nonNull.string("added")
        t.int("year")
        t.string("description")
    },
})

export const MangaQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("mangas", {
            type: "Manga",
            resolve(parent, args, context, info) {
                return mangas
            },
        })
    },
})

export const RecommendationQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("recommendedManga", {
            type: "Manga",
            args: {
                userId: 'Int', // Аргумент для идентификатора пользователя
            },
            resolve(parent, { userId }, context, info) {
                // Здесь вы можете добавить логику для получения рекомендаций для данного пользователя
                // В нашем примере мы просто возвращаем фиктивные рекомендации
                return mangas
            },
        })
    },
})

export const MangaMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("manga", {
            type: "Manga",
            args: {
                title: nonNull(stringArg()),
                cover: nonNull(stringArg()),
                year: intArg(),
                description: stringArg(),
            },

            resolve(parent, args, context) {
                const { year, title, cover, description } = args

                let idCount = mangas.length + 1
                const manga = {
                    id: idCount,
                    year: year,
                    title: title,
                    cover: cover,
                    description: description,
                    added: new Date().toLocaleDateString(),
                }
                mangas.push(manga)
                return manga
            },
        })
    },
})
