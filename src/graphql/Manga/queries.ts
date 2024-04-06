import {enumType, extendType, intArg, list, stringArg, nonNull} from "nexus"
import {Context} from "../../context"
import {Prisma} from "@prisma/client"
import {DefaultArgs, GetFindResult, GetResult} from "@prisma/client/runtime/library"

type Manga = {
    title: { lang: number, text: string }[];
    description: { lang: number, text: string }[];
    cover: { lang: number, url: string }[];
    [key: string]: any; // Позволяет другим полям в объекте
}

type MangaQueriesAdditionalFields = {
    author?: { name: string }[]
    artist?: { name: string }[]
    publisher?: { name: string }[]
}

function sortByLangId(langId: (number | null)[], manga: Manga) {
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

function sortListByLangId(langId: (number | null)[], mangaList: Manga[]) {
    mangaList.forEach(manga => sortByLangId(langId, manga))
}

type MangasQueryPrismaResult = GetFindResult<Prisma.$MangaPayload<DefaultArgs>, {
    take: any;
    include: {
        cover: { include: { langCodes: boolean } };
        publishers2manga: { include: { publisher: boolean } };
        artist2manga: { include: { people: boolean } };
        description: { include: { langCodes: boolean } };
        title: { include: { langCodes: boolean } };
        author2manga: { include: { people: boolean } }
    };
    skip: number
}>

type MangasQueryResult = MangaQueriesAdditionalFields & MangaQueryPrismaResult

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
            // @ts-ignore
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

                // @ts-ignore
                const mangas: MangasQueryResult[] = [...result] as unknown as MangasQueryPrismaResult[]

                mangas.forEach((manga, index) => {
                    manga.author = []
                    manga.artist = []
                    manga.publisher = []

                    result[index].author2manga.map(obj => manga.author?.push(obj.people))
                    result[index].artist2manga.map(obj => manga.artist?.push(obj.people))
                    result[index].publishers2manga.map(obj => manga.publisher?.push(obj.publisher))
                })

                if (langId) sortListByLangId(langId, mangas as unknown as Manga[])

                return result
            },
        })
    },
})

type MangaQueryPrismaResult = Prisma.Prisma__MangaClient<GetResult<Prisma.$MangaPayload<DefaultArgs>, {
    include: {
        cover: { include: { langCodes: boolean } };
        publishers2manga: { include: { publisher: boolean } };
        artist2manga: { include: { people: boolean } };
        description: { include: { langCodes: boolean } };
        title: { include: { langCodes: boolean } };
        author2manga: { include: { people: boolean } }
    };
    where: { id: any }
}, "findUnique"> | null, null, DefaultArgs>

type MangaQueryResult = MangaQueriesAdditionalFields & MangaQueryPrismaResult

export const MangaQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.field("manga", {
            type: "Manga",
            args: {
                id: nonNull(intArg()),
                langId: list(intArg())
            },
            // @ts-ignore
            async resolve(parent, {
                id,
                langId
            }, context: Context, info) {
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

                const manga: MangaQueryResult = {...result} as unknown as MangaQueryPrismaResult

                manga.author = []
                manga.artist = []
                manga.publisher = []

                result?.author2manga.map(obj => manga.author?.push(obj.people))
                result?.artist2manga.map(obj => manga.artist?.push(obj.people))
                result?.publishers2manga.map(obj => manga.publisher?.push(obj.publisher))

                if (langId) sortByLangId(langId, manga as unknown as Manga)

                return manga
            },
        })
    },
})
