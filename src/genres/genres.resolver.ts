import {Args, Mutation, Query, Resolver} from "@nestjs/graphql"
import {GenresService} from "./genres.service"
import {GenreEntity} from "./entities/genre.entity"
import {CreateGenreInput} from "./dto/create-genre.input"
import {UpdateGenreInput} from "./dto/update-genre.input"

@Resolver(() => GenreEntity)
export class GenresResolver {
    constructor(private readonly genresService: GenresService) {
    }

    @Mutation(() => GenreEntity)
    createGenre(@Args("createGenreInput") createGenreInput: CreateGenreInput) {
        return this.genresService.create(createGenreInput)
    }

    @Query(() => [GenreEntity], {name: "genres"})
    findAll() {
        return this.genresService.findAll()
    }

    @Query(() => GenreEntity, {name: "genre"})
    findOne(@Args("id", {type: () => String}) _id: string) {
        return this.genresService.findOne(_id)
    }

    @Mutation(() => GenreEntity)
    updateGenre(@Args("updateGenreInput") updateGenreInput: UpdateGenreInput) {
        return this.genresService.update(updateGenreInput)
    }

    @Mutation(() => GenreEntity)
    removeGenre(@Args("id", {type: () => String}) _id: string) {
        return this.genresService.remove(_id)
    }
}
