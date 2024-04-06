import {objectType} from "nexus"

export const People = objectType({
    name: "People",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.string("name")
    },
})
