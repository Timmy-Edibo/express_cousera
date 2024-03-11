import express from "express";

import { createNewBook, fetchBooks, deleteBook, fetchBookByIsbn, fetchBooksByAuthor,fetchBooksByTitle} from "../controllers/book";

export default (router: express.Router) => {
  router.post("/books", createNewBook);
  router.get("/books/:isbn", fetchBookByIsbn);
  router.get("/books/author/:author", fetchBooksByAuthor);
  router.get("/books/title/:title", fetchBooksByTitle);
  router.get("/books", fetchBooks);
  router.delete("/books/delete/:isbn", deleteBook);

};
