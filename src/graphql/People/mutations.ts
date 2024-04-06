import {extendType, nonNull, stringArg} from "nexus";
import {Context} from "../../context";

export const PeopleMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createPeople", {
            type: "People",
            args: {
                name: nonNull(stringArg())
            },
            async resolve(parent, {
                name
            }, context: Context, info) {
                return context.prisma.people.create({
                    data: {
                        name: name,
                    }
                })
            },
        })
    },
})
