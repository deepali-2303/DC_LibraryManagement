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
  // Access the port number from the req object
  const port = req.port;

  // Log the port number
  console.log('Server is running on port:', port);
  res.json(books);
  // console.log(books);
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



const borrowBook = asyncHandler(async (req, res) => {
  // Extract book ID, count, and availability from the request body
  const { name, cnt } = req.body;

  const book = await Book.findOne({name});
  if(book) {
    if(book.count < cnt)
    {
      res.status(400)
      throw new Error("Not sufficient books available")
    }

    const student = await Student.findById(req.user.id);
    const newCount = book.count - cnt;
    const updatedBook = await Book.findByIdAndUpdate(
      book.id,
      {count: newCount, 
      status: newCount == 0 ? "Unavailable" : "Available"},
      { new: true } // To return the updated document
    );
  
    
  
    if (!updatedBook) {
      // If the book is not found
      res.status(404);
      throw new Error("Book not updated");
    }
  
    if(student)
    {
      book.students.push(student._id);
      await book.save();
      student.books.push(book._id);
      
      await student.save();
    }
    else
    {
      res.status(400)
      throw new Error("List not updated");
    }

    // Send a success response with the updated book
    res.json({ message: "Book updated successfully", book: updatedBook });



  }
  else
  {
    // If the book is not found
    res.status(404);
    throw new Error("Book not found");
  }
  // Find the book by ID and update its count and availability
  
});



const returnBook = asyncHandler(async (req, res) => {
  // Extract book ID, count, and availability from the request body
  const { name, cnt } = req.body;

  const book = await Book.findOne({name});
  if(book) {

    const student = await Student.findById(req.user.id);
    const newCount = book.count + cnt;
    const updatedBook = await Book.findByIdAndUpdate(
      book.id,
      {count: newCount, 
      status: newCount == 0 ? "Unavailable" : "Available"},
      { new: true } // To return the updated document
    );
  
    
  
    if (!updatedBook) {
      // If the book is not found
      res.status(404);
      throw new Error("Book not updated");
    }
  
    if(student)
    {
      book.students.remove(student._id);
      await book.save();
      student.books.remove(book._id);
      await student.save();
    }
    else
    {
      res.status(400)
      throw new Error("List not updated");
    }

    // Send a success response with the updated book
    res.json({ message: "Book updated successfully", book: updatedBook });



  }
  else
  {
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
