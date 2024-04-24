import {Injectable} from "@nestjs/common"
import {CreatePersonInput} from "./dto/create-person.input"
import {UpdatePersonInput} from "./dto/update-person.input"
import {InjectModel} from "@nestjs/mongoose"
import {Model} from "mongoose"
import {PersonEntity} from "./entities/person.entity"

@Injectable()
export class PeopleService {
    constructor(
        @InjectModel(PersonEntity.name) private personModel: Model<PersonEntity>
    ) {
    }

    create(createPersonInput: CreatePersonInput) {
        const createdPerson = new this.personModel(createPersonInput)
        return createdPerson.save()
    }

    findAll() {
        return this.personModel.find().exec()
    }

    findOne(_id: string) {
        return this.personModel.findById(_id).exec()
    }

    async update(updatePersonInput: UpdatePersonInput) {
        const updatedPerson = await this.personModel.findByIdAndUpdate(updatePersonInput._id, updatePersonInput).exec()
        return this.findOne(updatedPerson.id)
    }

    remove(_id: string) {
        return this.personModel.findByIdAndDelete(_id).exec()
    }
}
