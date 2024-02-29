# Bookshelf - NestJS Book API

Welcome to Bookshelf, a NestJS application for managing a collection of books.

[Swagger Documentation](localhost:3000/api#/) - Explore the API endpoints using Swagger UI.


## Installation 

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
The application will be running on `http://localhost:3000`.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Functional Requirement

1. **Retrieve all books**: GET request to '/books' should return a JSON response with an array of all books.
2. **Retrieve a specific book**: GET request to '/books/:id' should return a JSON response with the details of the book matching the provided ID.
3. **Add a new book**: POST request to '/books' should add a new book to the collection. The request body should contain the book details in JSON format.
4. **Update an existing book**: PUT request to '/books/:id' should update the details of the book matching the provided ID. The request body should contain the updated book details in JSON format.
5. **Delete a book**: DELETE request to '/books/:id' should remove the book matching the provided ID from the collection.

## Non-functional Requirement

1. Return appropriate error messages and HTTP status codes for various scenarios.
2. Ensure the application is consistently up and running with minimal downtime.

## Additional Features

- **Sort books by type and language**
- **Filter books by name, ISBN**
- **Search books by name, ISBN**

## Author

[Abdullah Ismail](https://github.com/whalewalker)