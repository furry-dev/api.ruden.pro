import { Module } from "@nestjs/common"
import { MangaService } from "./manga.service"
import { MangaResolver } from "./manga.resolver"
import { MongooseModule } from "@nestjs/mongoose"
import { MangaEntity, MangaSchema } from "./entities/manga.entity"

@Module({
    imports: [
        MongooseModule.forFeature([{ name: MangaEntity.name, schema: MangaSchema }])
    ],
    providers: [MangaResolver, MangaService]
})
export class MangaModule {
}
