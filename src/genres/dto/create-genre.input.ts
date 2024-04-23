import { Field, InputType } from "@nestjs/graphql"
import { TranslationStrDto } from "../../translation-str/dto/translations-str.dto"

@InputType()
export class CreateGenreInput {
    @Field(() => [TranslationStrDto], { description: "Manga titles" })
        names: TranslationStrDto[]
}
