import {Module} from "@nestjs/common"
import {PeopleService} from "./people.service"
import {PeopleResolver} from "./people.resolver"
import {MongooseModule} from "@nestjs/mongoose"
import {PersonEntity, PersonSchema} from "./entities/person.entity"

@Module({
    imports: [
        MongooseModule.forFeature([{name: PersonEntity.name, schema: PersonSchema}])
    ],
    providers: [PeopleResolver, PeopleService],
})
export class PeopleModule {
}
