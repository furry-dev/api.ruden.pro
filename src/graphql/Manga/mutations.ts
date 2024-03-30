import {enumType, extendType, intArg, list, nonNull} from "nexus"
import {AgeRatings, MangaStatus} from "nexus-prisma"
import {Context} from "../../context"


export const Mutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createManga", {
            type: "Manga",
            args: {
                title: nonNull(list(nonNull('TitleInput'))),
                cover: nonNull(list(nonNull('CoverInput'))),
                description: nonNull(list(nonNull('DescriptionInput'))),
                year: nonNull(intArg()),
                age_rating: nonNull(enumType({
                    name: 'AgeRating',
                    members: AgeRatings.members
                })),
                status: nonNull(enumType({
                    name: 'MangaStatus',
                    members: MangaStatus.members
                }))
            },
            async resolve(parent, {
                title,
                cover,
                description,
                year,
                age_rating,
                status
            }, context: Context, info) {
                const manga = await context.prisma.manga.create({
                    data: {
                        year: year!,
                        cover: {
                            create: cover.map(({file, lang}) => ({
                                file: file,
                                langCodes: {connect: {id: lang}}
                            }))
                        },
                        title: {
                            create: title.map(({text, lang}) => ({
                                text: text,
                                langCodes: {connect: {id: lang}}
                            }))
                        },
                        description: {
                            create: description.map(({text, lang}) => ({
                                text: text,
                                langCodes: {connect: {id: lang}}
                            }))
                        },
                        age_rating: age_rating,
                        status: status,
                        genres: {
                            create: []
                        }
                    },
                    select: {
                        id: true,
                        year: true,
                        added: true,
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
                        },
                        age_rating: true,
                        status: true
                    }
                })
                return manga
            },
        })
    },
})
