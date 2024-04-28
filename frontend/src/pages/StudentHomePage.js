import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { ListBooks } from "../components/ListBooks";
import axios from "axios";
import { Sidepanel } from "../components/Sidepanel";
import { BorrowBook } from "../components/BorrowBook";
import { ReturnBook } from "../components/ReturnBook";

export const StudentHomePage = () => {
  const api = "http://localhost:4000/api/student/logout";
  const nav = "/loginStudent";
  const token = "studentToken";

  const [books, setBooks] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [showBorrow, setShowBorrow] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [error, setError] = useState("");

  const listBooks = async () => {
    try {
      const Token = localStorage.getItem("studentToken");
      const response = await axios.get(
        "http://localhost:4000/api/student/listBooks",
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      setBooks(response.data);
      console.log(response.data);
      setShowBorrow(false);
      setShowReturn(false);
      setShowBooks(true);
    } catch (error) {
      console.error("Error listing books:", error);
    }
  };

  const borrowBooks = async () => {
    console.log("Borrow");
    setShowBooks(false);
    setShowReturn(false);
    setShowBorrow(true);


  }
  const returnBook = async () => {
    console.log("Returned");
    setShowBooks(false);
    setShowBorrow(false);
    setShowReturn(true);
  }

  

  return (
    <>
      <Navbar {...{ api, nav, token }} />
      <div className="flex">
        <Sidepanel listBooks={listBooks} borrowBook={borrowBooks} returnBook = {returnBook}/>
        <div className="flex-auto bg-gray-100">
          <div className="container mx-auto p-4">
            {/* Render content based on selected action */}
            {showBooks && <ListBooks books={books} />}
            {showBorrow && <BorrowBook />}
            {showReturn && <ReturnBook/>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};
