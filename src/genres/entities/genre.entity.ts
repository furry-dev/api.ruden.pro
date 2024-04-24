import {Field, ObjectType} from "@nestjs/graphql"
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {LocalizedStrEntity} from "../../localized-entities/entities/localized-str.entity"
import {Document, Schema as MongoSchema} from "mongoose"

@Schema({collection: "genres", timestamps: true})
@ObjectType()
export class GenreEntity {
    @Field(() => String)
        _id: MongoSchema.Types.ObjectId

    @Field(() => [LocalizedStrEntity])
    @Prop()
        names: LocalizedStrEntity[]
}

export type GenreDocument = GenreEntity & Document
export const GenreSchema = SchemaFactory.createForClass(GenreEntity)
