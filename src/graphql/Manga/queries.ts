import {enumType, extendType, intArg, list, stringArg, nonNull} from "nexus"
import {Context} from "../../context"
import MangaGraphQLEntityFromPrisma, {MangaEntity} from "./entity/MangaEntity"



function sortByLangId(langId: (number | null)[], manga: MangaEntity) {
    manga.title = manga.title.filter(title =>
        langId.some(langId => title.lang === langId)
    )
    manga.description = manga.description.filter(description =>
        langId.some(langId => description.lang === langId)
    )
    manga.cover = manga.cover.filter(cover =>
        langId.some(langId => cover.lang === langId)
    )
}

function sortListByLangId(langId: (number | null)[], mangaList: MangaEntity[]) {
    mangaList.forEach(manga => sortByLangId(langId, manga))
}

export const MangasQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.nonNull.field("mangaList", { // Обновленное имя запроса
            type: "Manga",
            args: {
                sorting: enumType({
                    name: "MangaSorting",
                    members: [
                        "POPULARITY",
                        "NEW",
                        "LATEST_UPDATES"
                    ]
                }),
                direction: enumType({
                    name: "SortingDirection",
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
                limit,
                page,
                langId
            }, context: Context) {
                limit = limit || 10
                page = page || 1

                const result = await context.prisma.manga.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    include: {
                        cover: {include: {langCodes: true}},
                        title: {include: {langCodes: true}},
                        description: {include: {langCodes: true}},
                        author2manga: {include: {people: true}},
                        artist2manga: {include: {people: true}},
                        publishers2manga: {include: {publisher: true}}
                    }
                })

                const mangas = result.map(manga => new MangaGraphQLEntityFromPrisma(manga))

                if (langId) sortListByLangId(langId, mangas)

                return mangas
            },
        })
    },
})


export const MangaQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("manga", {
            type: "Manga",
            args: {
                id: nonNull(intArg()),
                langId: list(intArg())
            },
            async resolve(parent, {
                id,
                langId
            }, context: Context) {
                const result = await context.prisma.manga.findUnique({
                    include: {
                        cover: {include: {langCodes: true}},
                        title: {include: {langCodes: true}},
                        description: {include: {langCodes: true}},
                        author2manga: {include: {people: true}},
                        artist2manga: {include: {people: true}},
                        publishers2manga: {include: {publisher: true}}
                    },
                    where: {
                        id: id
                    }
                })

                if (!result) throw Error("Manga result is null")

                const manga = new MangaGraphQLEntityFromPrisma(result)

                if (langId) sortByLangId(langId, manga)

                return manga
            },
        })
    },
})
