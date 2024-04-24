import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class LocalizedStrEntity {
    @Field(() => String)
        lang: string

    @Field(() => String)
        text: string
}
