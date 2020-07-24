import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');

  await app.listen(AppModule.port);
}
bootstrap();
