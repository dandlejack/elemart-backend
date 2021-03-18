import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import {mongoose} from 'mongoose'
// mongoose.set('useFindAndModify',true)
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
