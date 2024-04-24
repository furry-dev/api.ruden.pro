import {Args, Mutation, Query, Resolver} from "@nestjs/graphql"
import {MangaService} from "./manga.service"
import {MangaEntity} from "./entities/manga.entity"
import {CreateMangaInput} from "./dto/create-manga.input"
import {UpdateMangaInput} from "./dto/update-manga.input"

@Resolver(() => MangaEntity)
export class MangaResolver {
    constructor(
        private readonly mangaService: MangaService
    ) {
    }

    @Mutation(() => MangaEntity)
    async createManga(@Args("createMangaInput") createMangaInput: CreateMangaInput) {
        return this.mangaService.create(createMangaInput)
    }

    @Query(() => [MangaEntity], {name: "mangas"})
    findAll(
        @Args("fieldsFilterLangCodes", {type: () => [String], nullable: true})
            fieldsFilterLangCodes?: string[],
        @Args("genreIds", {type: () => [String], nullable: true})
            genreIds?: string[],
        @Args("page", {type: () => Number, nullable: true})
            page?: number,
        @Args("limit", {type: () => Number, nullable: true})
            limit?: number
    ) {
        return this.mangaService.findAll(fieldsFilterLangCodes, genreIds, page, limit)
    }

    @Query(() => MangaEntity, {name: "manga"})
    findOne(
        @Args("id", {type: () => String}) _id: string,
        @Args("fieldsFilterLangCodes", {type: () => [String], nullable: true})
            fieldsFilterLangCodes?: string[]
    ) {
        return this.mangaService.findOne(_id, fieldsFilterLangCodes)
    }

    @Mutation(() => MangaEntity)
    updateManga(@Args("updateMangaInput") updateMangaInput: UpdateMangaInput) {
        return this.mangaService.update(updateMangaInput)
    }

    @Mutation(() => MangaEntity)
    removeManga(@Args("id", {type: () => String}) _id: string) {
        return this.mangaService.remove(_id)
    }
}
