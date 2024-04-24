import {Field, InputType} from "@nestjs/graphql"

@InputType()
export class LabeledStrDto {
    @Field(() => String, {description: "Lang code"})
        label: string

    @Field(() => String, {description: "Some text"})
        text: string
}