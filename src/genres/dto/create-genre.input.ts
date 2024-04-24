import {Field, InputType} from "@nestjs/graphql"
import {LocalizedStrDto} from "../../localized-entities/dto/localized-str.dto"

@InputType()
export class CreateGenreInput {
    @Field(() => [LocalizedStrDto], {description: "Manga titles"})
        names: LocalizedStrDto[]
}
