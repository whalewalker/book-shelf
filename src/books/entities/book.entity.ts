import { BookType } from './book-type';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  title: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true, nullable: false })
  isbn: string;

  @Column({ type: 'enum', enum: BookType })
  type: BookType;

  @Column({ nullable: false, default: 'English' })
  language: string;

  @Column({ nullable: false })
  author: string;
}
