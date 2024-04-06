import {objectType} from "nexus"

export const Language = objectType({
    name: "Language",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.string("name")
    },
})
