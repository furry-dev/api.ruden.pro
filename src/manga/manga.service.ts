import { Injectable } from "@nestjs/common"
import { CreateMangaInput } from "./dto/create-manga.input"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { MangaEntity } from "./entities/manga.entity"

@Injectable()
export class MangaService {
    constructor(
        @InjectModel(MangaEntity.name) private mangaModel: Model<MangaEntity>
    ) {
    }

    async create(createMangaInput: CreateMangaInput) {
        const genreIds = createMangaInput.genres.map(id => new Types.ObjectId(id))
        const createdManga = new this.mangaModel({
            ...createMangaInput,
            genres: genreIds
        })

        return createdManga.save()
    }

    findAll() {
        return this.mangaModel.find().populate("genres").exec()
    }

    //
    // findOne(id: number) {
    //     return `This action returns a #${id} manga`
    // }
    //
    // update(id: number, updateMangaInput: UpdateMangaInput) {
    //     return `This action updates a #${id} manga`
    // }
    //
    // remove(id: number) {
    //     return `This action removes a #${id} manga`
    // }
}
