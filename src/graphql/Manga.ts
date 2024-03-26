import {extendType, intArg, nonNull, objectType, stringArg} from "nexus"
import {NexusGenObjects} from "../nexus-typegen"


let mangas: NexusGenObjects["Manga"][] = [
    {
        id: 1,
        year: 2019,
        title: "I gave my first time to my brother",
        cover: "manga-cover_1.webp",
        description: "Desc 1",
        added: "26.03.2024",
        // genres: ["Школа", "Романтика", "Повседневность"]
    },
    {
        id: 2,
        year: 2016,
        title: "My first time with... my little sister!?",
        cover: "manga-cover_2.webp",
        description: "Desc 2",
        added: "03.07.2018",
        // genres: ["Школа", "Романтика", "Повседневность"]
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
        t.nonNull.list.nonNull.field("mangaList", { // Обновленное имя запроса
            type: "Manga",
            args: {
                sorting: stringArg(), // Аргумент для сортировки
                direction: stringArg(), // Направление сортировки
                genres: stringArg(), // Строка для списка жанров
                limit: intArg(),
                page: intArg(),
            },
            resolve(parent, { sorting, direction, genres, limit, page }, context, info) {
                let result = [...mangas]
                limit = limit || 10
                page = page || 1

                // Применяем фильтрацию по жанрам, если указаны
                // if (genres) {
                //     const genresList = genres.split(",")
                //     result = result.filter(manga =>
                //         genresList.every(genre => manga.genres.includes(genre.trim()))
                //     )
                // }

                // Применяем сортировку, если указана
                // if (sorting) {
                //     switch (sorting.toUpperCase()) {
                //         case "POPULARITY":
                //             result.sort((a, b) => (direction.toUpperCase() === "DESC" ? b.popularityRank - a.popularityRank : a.popularityRank - b.popularityRank))
                //             break
                //         case "NEW":
                //             result.sort((a, b) => (direction.toUpperCase() === "DESC" ? new Date(b.added) - new Date(a.added) : new Date(a.added) - new Date(b.added)))
                //             break
                //         case "LATEST_UPDATES":
                //             result.sort((a, b) => (direction.toUpperCase() === "DESC" ? b.latestChapter - a.latestChapter : a.latestChapter - b.latestChapter))
                //             break
                //         default:
                //             break
                //     }
                // }

                // Применяем пагинацию
                const startIndex = (page - 1) * limit
                const endIndex = startIndex + limit
                return result.slice(startIndex, endIndex)
            },
        });
    },
})

export const RecommendationQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("recommendedManga", {
            type: "Manga",
            args: {
                userId: nonNull(intArg()),
                limit: intArg(),
                page: intArg()
            },
            resolve(parent, {userId, limit, page}, context, info) {
                let result = [...mangas]
                limit = limit || 10
                page = page || 1

                const startIndex = (page - 1) * limit
                const endIndex = startIndex + limit
                return result.slice(startIndex, endIndex)
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

            resolve(parent, {year, title, cover, description}, context) {

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
