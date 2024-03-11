import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    isbn: {
        type: String,
        required: [true, "Isbn is required"],
        unique: [true, "ISbn already  exists"],
      },
    author: {
      type: String,
      required: [true, "Please add the author name"],
    },
    title: {
      type: String,
      required: [true, "Please add the book title"],
    },
  },
  {
    timestamps: true,
  }
);

export const BookModel = mongoose.model("Book", BookSchema);

export const getBooks = () => BookModel.find();
export const getBookByTitle = (title: string) => BookModel.findOne({title});
export const getBookByIsbn = (isbn: string) => BookModel.findOne({ isbn });
export const getBookByAuthor = (author: string) => BookModel.find({ author });


export const createBook = (values: Record<string, any>) =>
  new BookModel(values).save().then((book) => book.toObject());

export const deleteBookById = (id: string) =>
  BookModel.findOneAndDelete({ _id: id });

export const updateBookById = (id: string, values: Record<string, any>) =>
  BookModel.findByIdAndUpdate(id, values);
