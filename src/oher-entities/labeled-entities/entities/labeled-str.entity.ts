import {Field, ObjectType} from "@nestjs/graphql"

@ObjectType()
export class LabeledStrEntity {
    @Field(() => String)
        label: string

    @Field(() => String)
        text: string
}
