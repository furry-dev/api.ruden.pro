import {Field, InputType, Int} from "@nestjs/graphql"
import {LocalizedStrDto} from "../../localized-entities/dto/localized-str.dto"
import {MangaAgeRatingEnum, MangaStatusEnum} from "../entities/manga.entity"
import {LocalizedImageDto} from "../../localized-entities/dto/localized-image.dto"

@InputType()
export class CreateMangaInput {
    @Field(() => Int, {description: "Manga year"})
        year: number

    @Field(() => [LocalizedStrDto], {description: "Manga titles"})
        titles: LocalizedStrDto[]

    @Field(() => [LocalizedStrDto], {description: "Manga descriptions"})
        descriptions: LocalizedStrDto[]

    @Field(() => [LocalizedImageDto], {description: "Manga descriptions"})
        covers: LocalizedImageDto[]

    @Field(() => [String], {description: "Manga genres _id list"})
        genres: string[]

    @Field(() => MangaAgeRatingEnum, {description: "Manga age rating"})
        ageRating: string

    @Field(() => MangaStatusEnum, {description: "Manga status"})
        status: string
}
