import {Field, InputType} from "@nestjs/graphql"

@InputType()
export class LocalizedStrDto {
    @Field(() => String, {description: "Lang code"})
        lang: string

    @Field(() => String, {description: "Some text"})
        text: string
}