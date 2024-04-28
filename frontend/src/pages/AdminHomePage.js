import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import axios from 'axios';
import { ListBooks } from '../components/ListBooks';
import { ListStudents } from '../components/ListStudents';
import { AddBook } from '../components/AddBook';
import {Sidebar} from '../components/Sidebar';

export const AdminHomePage = () => {
  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [showBooks, setShowBooks] = useState(false);
  const [showStudents, setShowStudents] = useState(false);
  const [showAddBook, setShowAddBook] = useState(false);
  const [error, setError] = useState('');


  const listBooks = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:80/api/admin/listBooks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
      const token = localStorage.getItem('adminToken');
      const response = await axios.get('http://localhost:80/api/admin/listStudents', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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

  

  const api = 'http://localhost:80/api/admin/logout';
  const nav = "/loginAdmin"
  const token = 'adminToken'

  return (
    <>
      <Navbar {...{api,nav,token}}/>
      <div className="flex">
        <Sidebar listBooks={listBooks} listStudents={listStudents} addBooks={addBooks} />

        <div className="flex-auto bg-gray-100">
          <div className="container mx-auto p-4">
            {/* Render content based on selected action */}
            {showBooks && (
              <ListBooks books={books}/>
            )}
            {showStudents && (
              <ListStudents students={students}/>
            )}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {showAddBook && (
              <AddBook listBooks={listBooks}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

