import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    example: 'My Love From Another Star',
    description: 'The title of the book',
  })
  @IsNotEmpty({ message: 'Title is required' })
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({ example: '1234567890', description: 'The ISBN of the book' })
  @IsNotEmpty({ message: 'ISBN is required' })
  @IsString({ message: 'ISBN must be a string' })
  isbn: string;

  @ApiProperty({
    example: 'ROMANCE',
    description: 'The genre of the book',
  })
  @IsOptional()
  @IsString({ message: 'Invalid book genre' })
  genre: string;

  @ApiProperty({ example: 'English', description: 'The language of the book' })
  @IsOptional()
  @IsString({ message: 'Language must be a string' })
  language: string;

  @ApiProperty({ example: 'John Doe', description: 'The author of the book' })
  @IsNotEmpty({ message: 'Author is required' })
  @IsString({ message: 'Author must be a string' })
  author: string;
}
