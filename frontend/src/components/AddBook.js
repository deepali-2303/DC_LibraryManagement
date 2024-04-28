import React, { useState } from 'react';
import axios from 'axios';

export const AddBook = ({ listBooks }) => {
  const [error, setError] = useState('');
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [language, setLanguage] = useState('');
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.post(
        'http://localhost:80/api/admin/addBook',
        {
          name: bookName,
          author: author,
          language: language,
          publisher: publisher,
          count: count,
          status: status,
          category: category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Call the listBooks function to list all books after adding a new book
      listBooks();

      // Clear input fields after successful submission
      setBookName('');
      setAuthor('');
      setPublisher('');
      setLanguage('');
      setCount(0);
      setStatus('');
      setCategory('');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Book</h2>
        <form onSubmit={handleSubmit} className="space-y-8 flex-col">
          <input
            type="text"
            placeholder="Enter book name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="input-field w-full flex bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-2"
          />
          <input
            type="text"
            placeholder="Enter author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input-field w-full flex bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-2"          />
          <input
            type="text"
            placeholder="Enter publisher"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
            className="input-field w-full flex bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-2"          />
          <input
            type="text"
            placeholder="Enter language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input-field w-full flex bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-2"          />
          <input
            type="number"
            placeholder="Enter count"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="input-field w-full flex bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-2"          />
          <input
            type="text"
            placeholder="Enter status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="input-field w-full flex bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-2"          />
          <input
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field w-full flex bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-2"          />
          <button type="submit" className="btn-primary w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600">
            Add
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default AddBook;
