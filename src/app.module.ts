import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: process.env.DB_URL,
      type: 'postgres',
      entities: [Book],
      synchronize: true,
      ssl: true,
    }),
    BooksModule,
  ],
})
export class AppModule {}
