import {Field, InputType} from "@nestjs/graphql"

@InputType()
export class LocalizedImageDto {
    @Field(() => String, {description: "Lang code"})
        lang: string

    @Field(() => String, {description: "Path to image"})
        imagePath: string
}