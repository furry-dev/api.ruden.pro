import {extendType, nonNull, stringArg} from "nexus";
import {Context} from "../../context";

export const LanguageMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createLanguage", {
            type: "Language",
            args: {
                name: nonNull(stringArg())
            },
            async resolve(parent, {
                name
            }, context: Context, info) {
                return context.prisma.langCodes.create({
                    data: {
                        name: name,
                    }
                })
            },
        })
    },
})
