import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { Book } from './books/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: 'postgres://book_shelf_user:Kbdq1CUnKdjLPVoF2IdFqXHtsP7OA4D4@dpg-cnguv5a0si5c73blguc0-a.oregon-postgres.render.com/book_shelf',
      type: 'postgres',
      entities: [Book],
      synchronize: true,
      database: 'book_shelf',
    }),
    BooksModule,
  ],
})
export class AppModule {}
