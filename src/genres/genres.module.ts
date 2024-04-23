import { Module } from "@nestjs/common"
import { GenresService } from "./genres.service"
import { GenresResolver } from "./genres.resolver"
import { MongooseModule } from "@nestjs/mongoose"
import { GenreEntity, GenreSchema } from "./entities/genre.entity"

@Module({
    imports: [
        MongooseModule.forFeature([{ name: GenreEntity.name, schema: GenreSchema }])
    ],
    providers: [GenresResolver, GenresService]
})
export class GenresModule {
}
