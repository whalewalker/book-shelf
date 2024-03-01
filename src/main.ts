import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { BadRequestException } from './books/exceptions/bad-request-exception';
import { ValidationError } from 'class-validator';
import {
  ResourceAlreadyExistExceptionFilter,
  ResourceNotFoundExceptionFilter,
  ServerExceptionFilter,
} from './books/exceptions/global-exception.filter';
import { Error } from './books/dto/response';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new ResourceAlreadyExistExceptionFilter(),
    new ResourceNotFoundExceptionFilter(),
    new ServerExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const message = 'Validation error';
        const customErrors: Error[] = errors.map((error: ValidationError) => ({
          fieldName: error.property,
          errorMessage: Object.values(error.constraints).join(', '),
        }));
        throw new BadRequestException(message, customErrors);
      },
    }),
  );

  setupSwagger(app);

  await app.listen(3000);
}

bootstrap();

const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle('Book Shelf')
    .setDescription('Simple CRUD operation for Book API')
    .setVersion('1.0')
    .addTag('books')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
