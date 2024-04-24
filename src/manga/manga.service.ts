import {Injectable} from "@nestjs/common"
import {CreateMangaInput} from "./dto/create-manga.input"
import {InjectModel} from "@nestjs/mongoose"
import {Model, Types} from "mongoose"
import {MangaEntity} from "./entities/manga.entity"
import {UpdateMangaInput} from "./dto/update-manga.input"
import {sortByLangCodes} from "../localized-entities/utils"

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

    async findAll(
        fieldsFilterLangCodes?: (string | null)[],
        genreIds?: string[],
        page?: number,
        limit?: number
    ) {
        let query = this.mangaModel.find()

        if (genreIds && genreIds.length > 0) {
            query = query.find({genres: {$in: genreIds.map(id => new Types.ObjectId(id))}})
        }

        if (page && limit) {
            query = query.skip((page - 1) * limit).limit(limit)
        }

        const mangas = await query.populate("genres").exec()

        if (fieldsFilterLangCodes) {
            mangas.forEach(manga => {
                manga.titles = sortByLangCodes(fieldsFilterLangCodes, manga.titles)
                manga.descriptions = sortByLangCodes(fieldsFilterLangCodes, manga.descriptions)
                manga.covers = sortByLangCodes(fieldsFilterLangCodes, manga.covers)
            })
        }

        return mangas
    }


    async findOne(_id: string, fieldsFilterLangCodes?: (string | null)[]) {
        const manga = await this.mangaModel.findById(_id).populate("genres").exec()

        if (fieldsFilterLangCodes) {
            manga.titles = sortByLangCodes(fieldsFilterLangCodes, manga.titles)
            manga.descriptions = sortByLangCodes(fieldsFilterLangCodes, manga.descriptions)
            manga.covers = sortByLangCodes(fieldsFilterLangCodes, manga.covers)
        }

        return manga
    }

    async update(updateMangaInput: UpdateMangaInput) {
        const updatedManga = await this.mangaModel.findByIdAndUpdate(updateMangaInput._id, updateMangaInput).exec()
        return this.findOne(updatedManga.id)
    }

    remove(_id: string) {
        return this.mangaModel.findByIdAndDelete(_id)
    }
}
