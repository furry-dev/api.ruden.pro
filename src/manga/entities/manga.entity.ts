import {Field, Int, ObjectType, registerEnumType} from "@nestjs/graphql"
import {Document, Schema as MongoSchema} from "mongoose"
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {LocalizedStrEntity} from "../../oher-entities/localized-entities/entities/localized-str.entity"
import {GenreEntity} from "../../genres/entities/genre.entity"
import {LocalizedImageEntity} from "../../oher-entities/localized-entities/entities/localized-image.entity"
import {PersonEntity} from "../../people/entities/person.entity"


export enum MangaStatusEnum {
    released = "released",
    ongoing = "ongoing",
    finished = "finished"
}

export enum MangaAgeRatingEnum {
    R_H = "hentai",
    R_18 = "18+",
    R_16 = "16+",
    R_12 = "12+"
}

registerEnumType(MangaStatusEnum, {name: "MangaStatusEnum"})
registerEnumType(MangaAgeRatingEnum, {name: "MangaAgeRatingEnum"})


@ObjectType()
@Schema({collection: "mangas", timestamps: true})
export class MangaEntity {
    @Field(() => String)
        _id: MongoSchema.Types.ObjectId

    @Field(() => Int)
    @Prop()
        year: number

    @Field(() => [LocalizedStrEntity])
    @Prop()
        titles: LocalizedStrEntity[]

    @Field(() => [LocalizedStrEntity])
    @Prop()
        descriptions: LocalizedStrEntity[]

    @Field(() => [LocalizedImageEntity])
    @Prop()
        covers: LocalizedImageEntity[]

    @Field(() => [GenreEntity])
    @Prop({type: [{type: MongoSchema.Types.ObjectId, ref: "GenreEntity"}], default: []})
        genres: GenreEntity[]

    @Field(() => [PersonEntity])
    @Prop({type: [{type: MongoSchema.Types.ObjectId, ref: "PersonEntity"}], default: []})
        authors: PersonEntity[]

    @Field(() => [PersonEntity])
    @Prop({type: [{type: MongoSchema.Types.ObjectId, ref: "PersonEntity"}], default: []})
        artists: PersonEntity[]

    @Field(() => MangaAgeRatingEnum)
    @Prop({type: String, enum: MangaAgeRatingEnum, default: MangaAgeRatingEnum.R_H})
        ageRating: string

    @Field(() => MangaStatusEnum)
    @Prop({type: String, enum: MangaStatusEnum, default: MangaStatusEnum.released})
        status: string
}

export type MangaDocument = MangaEntity & Document
export const MangaSchema = SchemaFactory.createForClass(MangaEntity)
