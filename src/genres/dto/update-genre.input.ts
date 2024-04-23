import { CreateGenreInput } from "./create-genre.input"
import { Field, InputType, PartialType } from "@nestjs/graphql"
import { Schema as MongoSchema } from "mongoose"

@InputType()
export class UpdateGenreInput extends PartialType(CreateGenreInput) {
    @Field(() => String)
        _id: MongoSchema.Types.ObjectId
}
