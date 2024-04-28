import React, { useState } from 'react';

export const ListBooks = ({ books }) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleRowClick = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  return (
    <div>
      
        <h2 className="text-xl font-bold mb-4">Books</h2>
        <table className="w-full border-collapse border border-gray-400">
          <thead className="bg-gray-200">
            <tr >
              <th className="border border-gray-400 px-4 py-2">Book Name</th>
              <th className="border border-gray-400 px-4 py-2">Author</th>
              {/* <th className="px-4 py-2 text-left">Count</th>
              <th className="px-4 py-2 text-left">Publisher</th>
              <th className="px-4 py-2 text-left">Language</th> */}
              <th className="border border-gray-400 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={index} className="hover:bg-gray-100" onClick={() => handleRowClick(book)}>
                <td className="border border-gray-400 px-4 py-2">{book.name}</td>
                <td className="border border-gray-400 px-4 py-2">{book.author}</td>
                {/* <td className="px-4 py-2">{book.count}</td>
                <td className="px-4 py-2">{book.publisher}</td>
                <td className="px-4 py-2">{book.language}</td> */}
                <td className="border border-gray-400 px-4 py-2">{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
      {selectedBook && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="max-w-lg w-full p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Book Details</h2>
            <p><strong>Book Name:</strong> {selectedBook.name}</p>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Count:</strong> {selectedBook.count}</p>
            <p><strong>Publisher:</strong> {selectedBook.publisher}</p>
            <p><strong>Language:</strong> {selectedBook.language}</p>
            <p><strong>Status:</strong> {selectedBook.status}</p>
            <p><strong>Students:</strong> {selectedBook.students}</p>
            <button onClick={closeModal} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};


