import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config({ path: `../${process.env.NODE_ENV}.env` });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  await app.listen(process.env.PORT);
}
bootstrap();
