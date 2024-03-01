import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

@Entity({ name: 'books' })
export class Book {
  @ApiProperty({ example: 1, description: 'The ID of the book' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'My Love From Another Star',
    description: 'The title of the book',
  })
  @Column({ unique: true, nullable: false })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ example: '1234567890', description: 'The ISBN of the book' })
  @Column({ unique: true, nullable: false })
  @IsNotEmpty({ message: 'ISBN is required' })
  isbn: string;

  @ApiProperty({
    example: 'ROMANCE',
    description: 'The genre of the book',
  })
  @Column({ default: 'GENERAL' })
  @IsEnum({ message: 'Invalid book genre' })
  genre: string;

  @ApiProperty({ example: 'English', description: 'The language of the book' })
  @Column({ nullable: false, default: 'English' })
  language: string;

  @ApiProperty({ example: 'John Doe', description: 'The author of the book' })
  @Column({ nullable: false })
  @IsNotEmpty({ message: 'Author is required' })
  author: string;

  @ApiProperty({
    example: new Date(),
    description: 'The creation date of the book',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: new Date(),
    description: 'The last update date of the book',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
