import express from "express";
import { getBookByIsbn, createBook, deleteBookById } from "../db/books";
import { getBooks, getBookByAuthor, getBookByTitle} from "../db/books";

export const createNewBook = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, isbn, author } = req.body;
    if (!title || !isbn || !author) return res.sendStatus(400);

    const existingBook = await getBookByIsbn(isbn);
    if (existingBook) {
      console.log("book already exist", existingBook);
      return res.sendStatus(400);
    }
    console.log("working till here", title, isbn, author);

    const book = await createBook({
      title,
      isbn,
      author,
    });

    return res.status(200).json(book).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const fetchBooks = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const books = await getBooks();

    return res.status(200).json(books).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const fetchBookByIsbn = async (
  req: express.Request,
  res: express.Response
) => {
//   console.log("books list called");
  const bookIsbn: string = req.params.isbn;
  try {
    const book = await getBookByIsbn(bookIsbn);
    if (book) return res.status(200).json(book).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const fetchBooksByAuthor = async (
  req: express.Request,
  res: express.Response
) => {
  console.log("Books list by author");
  const authorName: string = req.params.author;
  try {
    const books = await getBookByAuthor(authorName);

    if (books.length > 0) {
      return res.status(200).json(books);
    } else {
      return res.status(404).send("No books found for the author");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};


export const fetchBooksByTitle = async (
    req: express.Request,
    res: express.Response
  ) => {
      const bookTitle: string = req.params.title;
      console.log("Books list by title", bookTitle);
    try {
      const books = await getBookByTitle(bookTitle);
  
      if (books) {
        return res.status(200).json(books);
      } else {
        return res.status(404).send("No books found for the author");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  };
  

export const deleteBook = async (
  req: express.Request,
  res: express.Response
) => {
  console.log("Trying to delete");
  const bookIsbn: string = req.params.isbn;
  try {
    const book = await getBookByIsbn(bookIsbn);

    if (book) {
      await deleteBookById(book.id);
      return res.status(204).send(); // or use res.status(204).end();
    } else {
      return res.status(404).send("Book not found"); // Adjust status and message accordingly
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error"); // Adjust status and message accordingly
  }
};
