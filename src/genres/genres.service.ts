import {Injectable} from "@nestjs/common"
import {CreateGenreInput} from "./dto/create-genre.input"
import {InjectModel} from "@nestjs/mongoose"
import {Model} from "mongoose"
import {GenreEntity} from "./entities/genre.entity"
import {UpdateGenreInput} from "./dto/update-genre.input"

@Injectable()
export class GenresService {
    constructor(
        @InjectModel(GenreEntity.name) private genreModel: Model<GenreEntity>
    ) {
    }

    create(createGenreInput: CreateGenreInput) {
        const createdGenre = new this.genreModel(createGenreInput)
        return createdGenre.save()
    }

    findAll() {
        return this.genreModel.find().exec()
    }

    findOne(_id: string) {
        return this.genreModel.findById(_id).exec()
    }

    update(updateGenreInput: UpdateGenreInput) {
        return this.genreModel.findByIdAndUpdate(updateGenreInput._id, updateGenreInput).exec()
    }

    remove(_id: string) {
        return this.genreModel.findByIdAndDelete(_id)
    }
}
