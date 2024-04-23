import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class TranslationStrEntity {
    @Field(() => String)
        lang: string

    @Field(() => String)
        text: string
}
