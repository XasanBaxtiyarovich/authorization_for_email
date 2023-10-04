import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Trainee NestJS Developer')
  .setDescription('Тестовое задание')
  .setVersion('1.0.0')
  .addTag('NodeJS, NestJS, Postgress, TypeORM, JWT, Swagger')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => {
    console.log(`SERVER RUNING: ${PORT}\nDOCUMENTATION: http://localhost:${PORT}/api/docs`);
  });
}
bootstrap();