import { Module } from "@nestjs/common"
import { AppResolver } from "./app.resolver"
import { AppService } from "./app.service"

import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo"
import { join } from "path"
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MangaModule } from "../manga/manga.module"
import { GenresModule } from "../genres/genres.module"

@Module({
    imports: [
        MangaModule,
        GenresModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            playground: false,
            autoSchemaFile: join(process.cwd(), "src/schema.gql")
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                console.log("Use db: ", configService.get("DATABASE_URL"))

                const options: MongooseModuleOptions = {
                    uri: configService.get<string>("DATABASE_URL")
                }

                return options
            }
        }),
        ConfigModule.forRoot({
            cache: true
        })
    ],
    providers: [AppService, AppResolver]
})

export class AppModule {
}
