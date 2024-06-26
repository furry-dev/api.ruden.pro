import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app/app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors({ credentials: true })
    await app.listen(5555)
}

void bootstrap()
