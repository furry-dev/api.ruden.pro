import {Field, Int, ObjectType} from "@nestjs/graphql"
import {Document, Schema as MongoSchema} from "mongoose"
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose"
import {LocalizedStrEntity} from "../../oher-entities/localized-entities/entities/localized-str.entity"
import {LabeledStrEntity} from "../../oher-entities/labeled-entities/entities/labeled-str.entity"


@ObjectType()
@Schema({collection: "people", timestamps: true})
export class PersonEntity {
    @Field(() => String)
        _id: MongoSchema.Types.ObjectId

    @Field(() => Int, {nullable: true})
    @Prop()
        birthYear?: number

    @Field(() => String, {nullable: true})
    @Prop()
        place?: string

    @Field(() => [LocalizedStrEntity])
    @Prop()
        name: LocalizedStrEntity[]

    @Field(() => [LocalizedStrEntity])
    @Prop()
        bio: LocalizedStrEntity[]

    @Field(() => String, {nullable: true})
    @Prop()
        avatar?: string

    @Field(() => [LabeledStrEntity])
    @Prop()
        socialLinks: LabeledStrEntity[]
}

export type PersonDocument = PersonEntity & Document
export const PersonSchema = SchemaFactory.createForClass(PersonEntity)
