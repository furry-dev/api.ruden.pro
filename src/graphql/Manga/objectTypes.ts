import {inputObjectType, objectType} from "nexus"
import {Context} from "../../context"

export const TitleInput = inputObjectType({
    name: "TitleInput",
    definition(t) {
        t.nonNull.string("text")
        t.nonNull.int("lang")
    }
})
export const CoverInput = inputObjectType({
    name: "CoverInput",
    definition(t) {
        t.nonNull.string("file")
        t.nonNull.int("lang")
    }
})

export const DescriptionInput = inputObjectType({
    name: "DescriptionInput",
    definition(t) {
        t.nonNull.string("text")
        t.nonNull.int("lang")
    }
})

export const PublisherInput = inputObjectType({
    name: "PublisherInput",
    definition(t) {
        t.nonNull.int("id")
    }
})

export const PeopleInput = inputObjectType({
    name: "PeopleInput",
    definition(t) {
        t.nonNull.int("id")
    }
})

export const MangaDescription = objectType({
    name: "MangaDescription",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.int("mangaId")
        t.nonNull.string("text")
        t.nonNull.int("lang")
        t.field("langCodes", {
            type: "Language",
            async resolve(parent, args, context: Context, info) {
                return context.prisma.langCodes.findUnique({
                    where: {id: parent.lang}
                })
            },
        })
    },
})

export const MangaTitle = objectType({
    name: "MangaTitle",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.int("mangaId")
        t.nonNull.string("text")
        t.nonNull.int("lang")
        t.field("langCodes", {
            type: "Language",
            async resolve(parent, args, context: Context, info) {
                return context.prisma.langCodes.findUnique({
                    where: {id: parent.lang}
                })
            },
        })
    },
})

export const MangaCover = objectType({
    name: "MangaCover",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.int("mangaId")
        t.nonNull.string("file")
        t.nonNull.int("lang")
        t.field("langCodes", {
            type: "Language",
            async resolve(parent, args, context: Context, info) {
                return context.prisma.langCodes.findUnique({
                    where: {id: parent.lang}
                })
            },
        })
    },
})

export const Manga = objectType({
    name: "Manga",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.list.field("title", {type: "MangaTitle"})
        t.nonNull.list.field("cover", {type: "MangaCover",})
        t.nonNull.list.field("description", {type: "MangaDescription"})
        t.nonNull.list.field("artist", {type: "People"})
        t.nonNull.list.field("author", {type: "People"})
        t.nonNull.list.field("publisher", {type: "Publisher"})
        t.nonNull.string("added")
        t.nonNull.string("ageRating")
        t.int("year")
    },
})
