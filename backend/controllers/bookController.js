const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const Student = require("../models/studentModel");
// const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const Book = require("../models/bookModel");
const { errorHandler } = require("../middleware/errorMiddleware");
const Redis = require('ioredis');
const redisClient = new Redis();
const AsyncLock = require('async-lock');
const lock = new AsyncLock();

const getBooks = asyncHandler(async (req, res) => {

  console.log(req.port);
  // Check if the books are available in the cache
  const cachedBooks = await redisClient.get('books');

  if (cachedBooks) {
    // If books are cached, return them from the cache
    console.log('Books retrieved from cache');

    return res.json(JSON.parse(cachedBooks));
  }

  // If books are not available in the cache, fetch them from the database
  const books = await Book.find();

  // Cache the fetched books for future requests with an expiry time of 60 seconds
  await redisClient.set('books', JSON.stringify(books), 'EX', 60);

  console.log('Books fetched from database and cached');

  // Send the books as a response
  return res.json(books);
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
    const books = await Book.find();
    await redisClient.set('books', JSON.stringify(books), 'EX', 60);
    console.log("Cache Updated");
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } else {
    res.status(400);
    throw new Error("Invalid  data");
  }
});


const borrowBook = asyncHandler(async (req, res) => {
  // Wrap the critical section with a lock
  await lock.acquire('borrowBookLock', async () => {
    console.log("Lock acquired");
    const { name, cnt } = req.body;

    // Retrieve book information from the database
    const book = await Book.findOne({ name });

    if (!book) {
      res.status(404);
      throw new Error("Book not found");
    }

    // Check if sufficient books are available
    if (book.count < cnt) {
      res.status(400);
      throw new Error("Not sufficient books available");
    }

    // Simulate a delay of 10 seconds to simulate a longer-running operation
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Update the count and status of the book
    const newCount = Number(book.count) - Number(cnt);
    const updatedBook = await Book.findByIdAndUpdate(
      book.id,
      { count: newCount, status: newCount === 0 ? "Unavailable" : "Available" },
      { new: true }
    );

    if (!updatedBook) {
      res.status(500);
      throw new Error("Failed to update book");
    }

    // Update the student's borrowed books list
    const student = await Student.findById(req.user.id);
    if (!student) {
      res.status(404);
      throw new Error("Student not found");
    }

    book.students.push(student._id);
    await book.save();
    student.books.push(book._id);
    await student.save();

    const books = await Book.find();
    await redisClient.set('books', JSON.stringify(books), 'EX', 60);
    console.log("Cache Updated");
    // Send a success response with the updated book
    res.json({ message: "Book updated successfully", book: updatedBook });
  });
  console.log("Lock released");
});





const returnBook = asyncHandler(async (req, res) => {
  // Extract book ID, count, and availability from the request body
  const { name, cnt } = req.body;

  const book = await Book.findOne({ name });
  if (book) {

    const student = await Student.findById(req.user.id);
    const newCount = Number(book.count) + Number(cnt);
    const updatedBook = await Book.findByIdAndUpdate(
      book.id,
      {
        count: newCount,
        status: newCount == 0 ? "Unavailable" : "Available"
      },
      { new: true } // To return the updated document
    );



    if (!updatedBook) {
      // If the book is not found
      res.status(404);
      throw new Error("Book not updated");
    }

    if (student) {
      book.students.remove(student._id);
      await book.save();
      student.books.remove(book._id);
      await student.save();
    }
    else {
      res.status(400)
      throw new Error("List not updated");
    }

    const books = await Book.find();
    await redisClient.set('books', JSON.stringify(books), 'EX', 60);
    console.log("Cache Updated");
    // Send a success response with the updated book
    res.json({ message: "Book updated successfully", book: updatedBook });



  }
  else {
    // If the book is not found
    res.status(404);
    throw new Error("Book not found");
  }
  // Find the book by ID and update its count and availability

});

module.exports = {
  getBooks,
  addBook,
  borrowBook,
  returnBook,
};
