import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'book_shelf',
      entities: [Book],
      synchronize: true,
      timezone: '+01:00',
      dateStrings: true,
    }),
    BooksModule,
  ],
})
export class AppModule {}
