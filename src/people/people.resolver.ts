import {Args, Mutation, Query, Resolver} from "@nestjs/graphql"
import {PeopleService} from "./people.service"
import {CreatePersonInput} from "./dto/create-person.input"
import {UpdatePersonInput} from "./dto/update-person.input"
import {PersonEntity} from "./entities/person.entity"

@Resolver(() => PersonEntity)
export class PeopleResolver {
    constructor(private readonly peopleService: PeopleService) {
    }

    @Mutation(() => PersonEntity)
    createPerson(@Args("createPersonInput") createPersonInput: CreatePersonInput) {
        return this.peopleService.create(createPersonInput)
    }

    @Query(() => [PersonEntity], {name: "people"})
    findAll() {
        return this.peopleService.findAll()
    }

    @Query(() => PersonEntity, {name: "person"})
    findOne(@Args("id", {type: () => String}) _id: string) {
        return this.peopleService.findOne(_id)
    }

    @Mutation(() => PersonEntity)
    updatePerson(@Args("updatePersonInput") updatePersonInput: UpdatePersonInput) {
        return this.peopleService.update(updatePersonInput)
    }

    @Mutation(() => PersonEntity)
    removePerson(@Args("id", {type: () => String}) _id: string) {
        return this.peopleService.remove(_id)
    }
}
