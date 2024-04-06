import {extendType, nonNull, stringArg} from "nexus"
import {Context} from "../../context"

export const PublisherMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createPublisher", {
            type: "Publisher",
            args: {
                name: nonNull(stringArg())
            },
            async resolve(parent, {
                name
            }, context: Context) {
                return context.prisma.publishers.create({
                    data: {
                        name: name,
                    }
                })
            },
        })
    },
})
