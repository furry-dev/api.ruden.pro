import { Field, InputType, Int } from "@nestjs/graphql"
import { TranslationStrDto } from "../../translation-str/dto/translations-str.dto"
import { MangaAgeRatingEnum, MangaStatusEnum } from "../entities/manga.entity"

@InputType()
export class CreateMangaInput {
    @Field(() => Int, { description: "Manga year" })
        year: number

    @Field(() => [TranslationStrDto], { description: "Manga titles" })
        titles: TranslationStrDto[]

    @Field(() => [TranslationStrDto], { description: "Manga descriptions" })
        descriptions: TranslationStrDto[]

    @Field(() => [String], { description: "Manga genres _id list" })
        genres: string[]
    
    @Field(() => MangaAgeRatingEnum, { description: "Manga age rating" })
        ageRating: string

    @Field(() => MangaStatusEnum, { description: "Manga status" })
        status: string
}
