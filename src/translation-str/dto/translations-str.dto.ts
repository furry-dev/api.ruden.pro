import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class TranslationStrDto {
    @Field(() => String, { description: "Manga year" })
        lang: string

    @Field(() => String, { description: "Manga year" })
        text: string
}