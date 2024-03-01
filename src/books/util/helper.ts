import { Book } from '../entities/book.entity';

const generateRandomBook = (): Book => {
  const book: Book = new Book();
  book.id = generateId();
  book.title = generateRandomTitle();
  book.isbn = generateRandomISBN();
  book.genre = generateRandomBookType();
  book.language = generateRandomLanguage();
  book.author = generateRandomAuthor();
  return book;
};

const generateRandomTitle = (): string => {
  return `Book ${Math.floor(Math.random() * 100) + 1}`;
};

const generateRandomISBN = (): string => {
  return `${Math.floor(Math.random() * 10000000000)}`;
};

const generateRandomBookType = (): string => {
  const bookTypes: string[] = ['ROMANCE', 'SCIENCE', 'HISTORY'];
  return bookTypes[Math.floor(Math.random() * bookTypes.length)];
};

const generateRandomLanguage = (): string => {
  const languages: string[] = ['English', 'Spanish', 'French'];
  return languages[Math.floor(Math.random() * languages.length)];
};

const generateRandomAuthor = (): string => {
  const firstNames: string[] = ['John', 'Jane', 'Michael', 'Emily'];
  const lastNames: string[] = ['Doe', 'Smith', 'Johnson', 'Brown'];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

export const generateRandomBooks = (count: number): Book[] => {
  const books: Book[] = [];
  for (let i = 0; i < count; i++) {
    books.push(generateRandomBook());
  }
  return books;
};

const generateId = (): number => {
  return Math.floor(Math.random() * 1000) + 1;
};
