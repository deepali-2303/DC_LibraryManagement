import React, { useState } from 'react';

const UserPage = () => {
  const [availableBooks, setAvailableBooks] = useState([
    { title: 'Book 1', count: 5 },
    { title: 'Book 2', count: 3 },
    // Add more books as needed
  ]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const borrowBook = (title) => {
    const updatedAvailableBooks = [...availableBooks];
    const bookIndex = updatedAvailableBooks.findIndex(book => book.title === title);

    if (bookIndex !== -1 && updatedAvailableBooks[bookIndex].count > 0) {
      updatedAvailableBooks[bookIndex].count--;
      setAvailableBooks(updatedAvailableBooks);

      setBorrowedBooks([...borrowedBooks, title]);
    } else {
      alert('No more copies available for borrowing.');
    }
  };

  const returnBook = (title) => {
    const updatedBorrowedBooks = borrowedBooks.filter(book => book !== title);
    setBorrowedBooks(updatedBorrowedBooks);

    const updatedAvailableBooks = [...availableBooks];
    const bookIndex = updatedAvailableBooks.findIndex(book => book.title === title);
    if (bookIndex !== -1) {
      updatedAvailableBooks[bookIndex].count++;
      setAvailableBooks(updatedAvailableBooks);
    }
  };

  return (
    <div>
      <h1>User Page</h1>

      <h2>Available Books</h2>
      <ul className="book-list">
        {availableBooks.map(book => (
          <li key={book.title} className="book-item">
            <span>Title: {book.title}</span>
            <button onClick={() => borrowBook(book.title)}>Borrow</button>
            <span>Count: {book.count}</span>
          </li>
        ))}
      </ul>

      <h2>Borrowed Books</h2>
      <ul className="book-list">
        {borrowedBooks.map(title => (
          <li key={title} className="book-item">
            <span>Title: {title}</span>
            <button onClick={() => returnBook(title)}>Return</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPage;
