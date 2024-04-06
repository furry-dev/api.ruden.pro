import {objectType} from "nexus"

export const Publisher = objectType({
    name: "Publisher",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.string("name")
    },
})
