import mongoose from "mongoose";

const BookReviewSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Please add the book"],
    },
    review: {
      type: String,
      required: [true, "Please add the book title"],
    },
  },
  {
    timestamps: true,
  }
);

export const BookModel = mongoose.model("BookReview", BookReviewSchema);

export const getBooks = () => BookModel.find();
export const getBookByTitle = (title: string) => BookModel.findById(title);
export const getBookByIsbn = (isbn: string) => BookModel.find({ isbn });
export const getBookByAuthor = (author: string) => BookModel.find({ author });

export const deleteBookById = (id: string) =>
  BookModel.findOneAndDelete({ _id: id });

export const updateBookById = (id: string, values: Record<string, any>) =>
  BookModel.findByIdAndUpdate(id, values);
