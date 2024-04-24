import {Field, InputType, Int} from "@nestjs/graphql"
import {LocalizedStrDto} from "../../oher-entities/localized-entities/dto/localized-str.dto"
import {LabeledStrDto} from "../../oher-entities/labeled-entities/dto/labeled-str.dto"

@InputType()
export class CreatePersonInput {
    @Field(() => Int, {nullable: true, description: "Manga year"})
        birthYear?: number

    @Field(() => [LocalizedStrDto], {description: "Manga titles"})
        name: LocalizedStrDto[]

    @Field(() => [LocalizedStrDto], {description: "Manga descriptions"})
        bio: LocalizedStrDto[]

    @Field(() => String, {nullable: true})
        avatar?: string

    @Field(() => [LabeledStrDto], {description: "Manga descriptions"})
        socialLinks?: LabeledStrDto[]
}
