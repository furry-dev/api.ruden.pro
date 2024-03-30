import {enumType, extendType, intArg, list, stringArg} from "nexus"
import {Context} from "../../context"
import { Prisma } from '@prisma/client'
import {DefaultArgs, GetFindResult } from "@prisma/client/runtime/library"


export const MangaQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("mangaList", { // Обновленное имя запроса
            type: "Manga",
            args: {
                sorting: enumType({
                    name: 'MangaSorting',
                    members: [
                        "POPULARITY",
                        "NEW",
                        "LATEST_UPDATES"
                    ]
                }),
                direction: enumType({
                    name: 'SortingDirection',
                    members: [
                        "DESC"
                    ]
                }),
                genres: stringArg(),
                limit: intArg(),
                page: intArg(),
                langId: list(intArg()),
            },
            async resolve(parent, {
                sorting,
                direction,
                genres,
                limit,
                page,
                langId
            }, context: Context, info) {
                limit = limit || 10
                page = page || 1

                let result: GetFindResult<Prisma.$MangaPayload<DefaultArgs>, {
                    take: any;
                    include: {
                        cover: { include: { langCodes: boolean } };
                        description: { include: { langCodes: boolean } };
                        title: { include: { langCodes: boolean } }
                    };
                    skip: number
                }>[] = await context.prisma.manga.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    include: {
                        cover: {
                            include: {
                                langCodes: true
                            }
                        },
                        title: {
                            include: {
                                langCodes: true
                            }
                        },
                        description: {
                            include: {
                                langCodes: true
                            }
                        }
                    }
                })

                if (langId) {
                    result.forEach(manga => {
                        manga.title = manga.title.filter(title =>
                            langId.some(langId => title.lang === langId)
                        )
                        manga.description = manga.description.filter(description =>
                            langId.some(langId => description.lang === langId)
                        )
                        manga.cover = manga.cover.filter(cover =>
                            langId.some(langId => cover.lang === langId)
                        )
                    })
                }

                return result

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

            },
        })
    },
})

// export const RecommendationQuery = extendType({
//     type: "Query",
//     definition(t) {
//         t.nonNull.list.nonNull.field("recommendedManga", {
//             type: "Manga",
//             args: {
//                 userId: nonNull(intArg()),
//                 limit: intArg(),
//                 page: intArg()
//             },
//             resolve(parent, {userId, limit, page}, context, info) {
//                 let result = [...mangas]
//                 limit = limit || 10
//                 page = page || 1
//
//                 const startIndex = (page - 1) * limit
//                 const endIndex = startIndex + limit
//                 return result.slice(startIndex, endIndex)
//             },
//         })
//     },
// })

