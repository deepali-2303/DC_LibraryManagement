import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import axios from 'axios';

export const AdminHomePage = () => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [language, setLanguage] = useState('');
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const listBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/admin/listBooks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      setBooks(response.data);
      setShowBooks(true);
      setShowStudents(false);
      setShowAddBook(false);
    } catch (error) {
      console.error('Error listing books:', error);
    }
  };


  const listStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/admin/listStudents', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      setStudents(response.data);
      setShowBooks(false);
      setShowStudents(true);
      setShowAddBook(false);
    } catch (error) {
      console.error('Error listing students:', error);
    }
  };

  const addBooks = async () => {
    try {
      setShowBooks(false);
      setShowStudents(false);
      setShowAddBook(true);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:4000/api/admin/addBook', {
        name: bookName,
        author: author,
        language: language,
        publisher: publisher,
        count: count,
        status: status,
        category: category,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      listBooks();      

    } catch (err) {
      setError(err.response.data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/loginAdmin');
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="h-full bg-gray text-white p-4">
        <div className="flex flex-col space-y-4">
          <select onChange={(e) => e.target.value === 'listBooks' ? listBooks() : e.target.value === 'listStudents' ? listStudents() : addBooks()} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white focus:outline-none">
            <option value="">Select an action</option>
            <option value="listBooks">List Books</option>
            <option value="listStudents">List Students</option>
            <option value="addBook">Add Book</option>
          </select>
        </div>
      </div>

      {/* Render content based on selected action */}
      {showBooks && (
        <div>
          <h2>Books</h2>
          <ul>
            {books.map((book, index) => (
              <li key={index}>{book.name}</li>
            ))}
          </ul>
        </div>
      )}
      {showStudents && (
        <div>
          <h2>Students</h2>
          <ul>
            {students.map((student, index) => (
              <li key={index}>{student.name}</li>
            ))}
          </ul>
        </div>)}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {showAddBook && (
        <div>
          <h2>Add Book</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter book name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter count"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
            />
            <input
              type="text"
              placeholder="Enter status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      )}


    </>
  );
};
