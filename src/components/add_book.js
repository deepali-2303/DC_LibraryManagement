import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    language: '',
    publisher: '',
    count: 0,
    status: '',
    category: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/books/add', formData);
      console.log(response.data);
      // Optionally, redirect to another page or show a success message
    } catch (error) {
      console.error('Error adding book:', error);
      // Optionally, show an error message
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Add New Book</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Language:</label>
          <input type="text" name="language" value={formData.language} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Publisher:</label>
          <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Count:</label>
          <input type="number" name="count" value={formData.count} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Status:</label>
          <input type="text" name="status" value={formData.status} onChange={handleChange} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Category:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} />
        </div>
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
