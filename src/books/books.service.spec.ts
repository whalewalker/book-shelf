import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { ResourceAlreadyExistException } from './exceptions/resource-already-exist-exception';
import { generateRandomBooks } from './util/helper';
import { ResourceNotFoundException } from './exceptions/resource-not-found-exception';
import { UpdateBookDto } from './dto/update-book.dto';
import { ResponseUtil } from './util/response-util';

describe('BooksService', () => {
  let service: BooksService;
  let bookRepository: Repository<Book>;
  let createBookDto: CreateBookDto;

  beforeEach(async () => {
    createBookDto = {
      author: 'Abdullah',
      title: 'Test Book',
      isbn: '1234567890',
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a book successfully', async () => {
      const book = generateRandomBooks(1)[0];
      jest
        .spyOn(bookRepository, 'findOne')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null);

      jest.spyOn(bookRepository, 'create').mockReturnValue(book);

      jest.spyOn(bookRepository, 'save').mockResolvedValue(book);

      await expect(service.create(createBookDto)).resolves.not.toThrow();

      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { title: createBookDto.title },
      });
      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { isbn: createBookDto.isbn },
      });
    });

    it('should throw ResourceAlreadyException when creating a book with an existing title', async () => {
      jest
        .spyOn(bookRepository, 'findOne')
        .mockResolvedValueOnce({ title: 'Existing Book Title' } as Book)
        .mockResolvedValueOnce(null);

      await expect(service.create(createBookDto)).rejects.toThrow(
        ResourceAlreadyExistException,
      );

      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { title: createBookDto.title },
      });
    });

    it('should throw ResourceAlreadyException when creating a book with an existing ISBN', async () => {
      jest
        .spyOn(bookRepository, 'findOne')
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ isbn: '1234567890' } as Book);

      await expect(service.create(createBookDto)).rejects.toThrow(
        ResourceAlreadyExistException,
      );

      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { isbn: createBookDto.isbn },
      });
    });
  });

  describe('findAll', () => {
    it('should return all books', async () => {
      const books: Book[] = generateRandomBooks(10);

      jest.spyOn(bookRepository, 'find').mockResolvedValue(books);

      const result = await service.findAll();

      expect(result).toEqual(ResponseUtil.successfulResponse([books]));
    });
  });

  describe('findOne', () => {
    it('should return the book with the specified id', async () => {
      const bookId = 1;
      const book: Book = generateRandomBooks(1)[0];

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(book);

      const result = await service.findOne(bookId);

      expect(result).toEqual(ResponseUtil.successfulResponse([book]));
    });

    it('should throw ResourceNotFoundException if no book with the specified id exists', async () => {
      const bookId = 1;
      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(bookId)).rejects.toThrow(
        ResourceNotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update the book with the specified id', async () => {
      const updateBookDto: UpdateBookDto = { title: 'Updated Title' };
      const existingBook: Book = generateRandomBooks(1)[0];
      const updatedBook: Book = { ...existingBook, ...updateBookDto };

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(existingBook);
      jest.spyOn(bookRepository, 'save').mockResolvedValue(updatedBook);

      const result = await service.update(existingBook.id, updateBookDto);

      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { id: existingBook.id },
      });
      expect(bookRepository.save).toHaveBeenCalledWith(updatedBook);
      expect(result).toEqual(ResponseUtil.successfulResponse([updatedBook]));
    });

    it('should throw ResourceNotFoundException if no book with the specified id exists', async () => {
      const bookId = 1;
      const updateBookDto: CreateBookDto = { title: 'Updated Title' };

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(bookId, updateBookDto)).rejects.toThrow(
        ResourceNotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove the book with the specified id', async () => {
      const bookId = 1;
      const existingBook: Book = generateRandomBooks(1)[0];

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(existingBook);
      jest.spyOn(bookRepository, 'remove').mockResolvedValue(existingBook);

      const result = await service.remove(bookId);

      expect(bookRepository.findOne).toHaveBeenCalledWith({
        where: { id: bookId },
      });
      expect(bookRepository.remove).toHaveBeenCalledWith(existingBook);
      expect(result).toEqual(
        ResponseUtil.successfulResponse(
          [],
          `Book with id ${bookId} removed successfully`,
        ),
      );
    });

    it('should throw ResourceNotFoundException if no book with the specified id exists', async () => {
      const bookId = 1;

      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(undefined);

      await expect(service.remove(bookId)).rejects.toThrow(
        ResourceNotFoundException,
      );
    });
  });
});
