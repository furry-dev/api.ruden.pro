import { Injectable } from "@nestjs/common"
import { CreateGenreInput } from "./dto/create-genre.input"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { GenreEntity } from "./entities/genre.entity"

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

    //
    // findOne(id: number) {
    //     return `This action returns a #${id} genre`
    // }
    //
    // update(id: number, updateGenreInput: UpdateGenreInput) {
    //     return `This action updates a #${id} genre`
    // }
    //
    // remove(id: number) {
    //     return `This action removes a #${id} genre`
    // }
}
