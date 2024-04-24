import {Field, ObjectType} from "@nestjs/graphql"

@ObjectType()
export class LocalizedImageEntity {
    @Field(() => String)
        lang: string

    @Field(() => String)
        imagePath: string
}
