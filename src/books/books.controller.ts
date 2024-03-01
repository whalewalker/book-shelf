import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './entities/book.entity';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ type: BookDto })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created',
    type: Book,
  })
  create(
    @Body(new ValidationPipe({ transform: true })) createBookDto: BookDto,
  ) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Returns all books', type: [Book] })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the book with the specified ID',
    type: Book,
  })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiBody({ type: BookDto })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully updated',
    type: Book,
  })
  update(@Param('id') id: string, @Body() bookDto: BookDto) {
    return this.booksService.update(+id, bookDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({
    status: 200,
    description: 'The book has been successfully deleted',
  })
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
