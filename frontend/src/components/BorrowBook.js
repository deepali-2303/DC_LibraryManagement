import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const BorrowBook = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [error, setError] = useState('');

  const fetchAvailableBooks = async () => {
    try {
      const token = localStorage.getItem('studentToken');
      const response = await axios.get('http://localhost:4000/api/student/listBooks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvailableBooks(response.data.filter(book => book.count >= 1));
    } catch (error) {
      setError('Error fetching available books');
    }
  };

  useEffect(() => {
    fetchAvailableBooks();
  }, []);

  const borrowBook = async (bookName) => {
    try {
      const token = localStorage.getItem('studentToken');
      await axios.post(
        'http://localhost:4000/api/student/borrowBook',
        { name: bookName, cnt: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Optionally, you can refresh the list of available books after borrowing
      fetchAvailableBooks();
    } catch (error) {
      setError('Error borrowing book');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Borrow Book</h2>
      <table className="w-full border-collapse border border-gray-400">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-400 px-4 py-2">Book Name</th>
            <th className="border border-gray-400 px-4 py-2">Available Count</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {availableBooks.map((book) => (
            <tr key={book._id} className="hover:bg-gray-100">
              <td className="border border-gray-400 px-4 py-2">{book.name}</td>
              <td className="border border-gray-400 px-4 py-2">{book.count}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => borrowBook(book.name)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Borrow
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};
