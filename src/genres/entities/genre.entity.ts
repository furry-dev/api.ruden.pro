import { Field, ObjectType } from "@nestjs/graphql"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { TranslationStrEntity } from "../../translation-str/entities/translation-str.entity"
import { Document, Schema as MongoSchema } from "mongoose"

@Schema({ collection: "genres", timestamps: true })
@ObjectType()
export class GenreEntity {
    @Field(() => String)
        _id: MongoSchema.Types.ObjectId

    @Field(() => [TranslationStrEntity])
    @Prop()
        names: TranslationStrEntity[]
}

export type GenreDocument = GenreEntity & Document
export const GenreSchema = SchemaFactory.createForClass(GenreEntity)
