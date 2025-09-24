import { NestFactory } from "@nestjs/core";
import { ViseModule } from "./vise.module";

async function bootstrap() {
  const app = await NestFactory.create(ViseModule);
  await app.listen(3000);
}
bootstrap();
