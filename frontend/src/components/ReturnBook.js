import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const ReturnBook = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const studentId = localStorage.getItem('studentId');
        const token = localStorage.getItem('studentToken');
        const response = await axios.get('http://localhost:80/api/student/listBooks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Filter out the books borrowed by the current student
        const borrowedByStudent = response.data.filter(book => book.students.includes(studentId));
        setBorrowedBooks(borrowedByStudent);
      } catch (error) {
        setError('Error fetching borrowed books');
      }
    };

    fetchBorrowedBooks();
  }, []);

  const returnBook = async (bookName) => {
    try {
      const token = localStorage.getItem('studentToken');
      await axios.post(
        'http://localhost:80/api/student/returnBook',
        { name: bookName, cnt: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Optionally, you can refresh the list of borrowed books after returning
      const updatedBooks = borrowedBooks.filter(book => book.name !== bookName);
      setBorrowedBooks(updatedBooks);
    } catch (error) {
      setError('Error returning book');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Return Book</h2>
      <table className="w-full border-collapse border border-gray-400">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-400 px-4 py-2">Book Name</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map((book) => (
            <tr key={book._id}
            className="hover:bg-gray-100">
              <td className="border border-gray-400 px-4 py-2">{book.name}</td>
              <td className="border border-gray-400 px-4 py-2">
                <button onClick={() => returnBook(book.name)} className="px-4 py-2 bg-red-500 text-white rounded-lg">
                  Return
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


