import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { ResourceAlreadyExistException } from './exceptions/resource-already-exist-exception';
import { ResourceNotFoundException } from './exceptions/resource-not-found-exception';
import { Response } from './dto/response';
import { ResponseUtil } from './util/response-util';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async create(bookDto: CreateBookDto): Promise<Response<Book>> {
    await this.validateTitle(bookDto.title);
    await this.validateISBN(bookDto.isbn);

    const book = this.bookRepository.create(bookDto);
    await this.bookRepository.save(book);
    return ResponseUtil.successfulResponse<Book>([book]);
  }

  async findAll(): Promise<Response<Book>> {
    const books = await this.bookRepository.find();
    return ResponseUtil.successfulResponse<Book>(books);
  }

  async findOne(id: number): Promise<Response<Book>> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new ResourceNotFoundException(`Book with id ${id} not found`);
    }
    return ResponseUtil.successfulResponse<Book>([book]);
  }

  async update(id: number, bookDto: UpdateBookDto): Promise<Response<Book>> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new ResourceNotFoundException(`Book with id ${id} not found`);
    }

    if (bookDto.title) await this.validateTitle(bookDto.title);
    if (bookDto.isbn) await this.validateISBN(bookDto.isbn);

    Object.assign(book, bookDto);

    const updatedBook = await this.bookRepository.save(book);
    return ResponseUtil.successfulResponse<Book>([updatedBook]);
  }

  async remove(id: number): Promise<Response<any>> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new ResourceNotFoundException(`Book with id ${id} not found`);
    }

    await this.bookRepository.remove(book);
    return ResponseUtil.successfulResponse<Book>(
      [],
      `Book with id ${id} removed successfully`,
    );
  }

  private async validateISBN(isbn: string) {
    const existingBookWithISBN = await this.bookRepository.findOne({
      where: { isbn },
    });
    if (existingBookWithISBN) {
      throw new ResourceAlreadyExistException(
        'Book with this ISBN already exists',
      );
    }
  }

  private async validateTitle(title: string) {
    const existingBookWithTitle = await this.bookRepository.findOne({
      where: { title },
    });
    if (existingBookWithTitle) {
      throw new ResourceAlreadyExistException(
        'Book with this title already exists',
      );
    }
  }
}
