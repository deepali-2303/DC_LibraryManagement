const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
// const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const Book = require("../models/bookModel");
const { errorHandler } = require("../middleware/errorMiddleware");

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();

  // Send the books as a response
  res.json(books);
  console.log(books);
});

const addBook = asyncHandler(async (req, res) => {
  const { name, author, language, publisher, count, status, category } =
    req.body;

  const bookExists = await Book.findOne({ name });
  if (bookExists) {
    res.status(400);
    throw new Error("Book already exists");
  }

  const newBook = await Book.create({
    name: name,
    author: author,
    language: language,
    publisher: publisher,
    count: count,
    status: status,
    category: category,
  });

  if (newBook) {
    await newBook.save();
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } else {
    res.status(400);
    throw new Error("Invalid  data");
  }
});

module.exports = {
  getBooks,
  addBook,
};
