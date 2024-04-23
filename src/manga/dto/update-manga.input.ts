import { CreateMangaInput } from "./create-manga.input"
import { Field, InputType, PartialType } from "@nestjs/graphql"
import { Schema as MongoSchema } from "mongoose"

@InputType()
export class UpdateMangaInput extends PartialType(CreateMangaInput) {
    @Field(() => String)
        _id: MongoSchema.Types.ObjectId
}
