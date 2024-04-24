import {CreatePersonInput} from "./create-person.input"
import {Field, InputType, PartialType} from "@nestjs/graphql"
import {Schema as MongoSchema} from "mongoose"

@InputType()
export class UpdatePersonInput extends PartialType(CreatePersonInput) {
    @Field(() => String)
        _id: MongoSchema.Types.ObjectId
}
