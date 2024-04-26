import {Field, InputType, Int} from "@nestjs/graphql"
import {LocalizedStrDto} from "../../oher-entities/localized-entities/dto/localized-str.dto"
import {MangaAgeRatingEnum, MangaStatusEnum} from "../entities/manga.entity"
import {LocalizedImageDto} from "../../oher-entities/localized-entities/dto/localized-image.dto"
import {Matches} from "class-validator"
import {SLUG_REGEX} from "../../constants/regex.constants"

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

    @Field(() => [String], {description: "Manga people _id list"})
        authors: string[]

    @Field(() => [String], {description: "Manga people _id list"})
        artists: string[]

    @Field(() => MangaAgeRatingEnum, {description: "Manga age rating"})
        ageRating: string

    @Field(() => MangaStatusEnum, {description: "Manga status"})
        status: string

    @Matches(SLUG_REGEX, {
        message: "Slug must contain only lowercase alphanumeric characters and hyphens, and cannot start or end with a hyphen",
    })
    @Field(() => String)
        slug: string
}
