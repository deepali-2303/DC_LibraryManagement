// AdminHome.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const AdminHome = () => {
//   const [students, setStudents] = useState([]);
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const studentsResponse = await axios.get('/api/students');
//         setStudents(studentsResponse.data);

//         const booksResponse = await axios.get('/api/books');
//         setBooks(booksResponse.data);

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//       <div style={{ flex: '1', marginRight: '20px' }}>
//         <h2>Students</h2>
//         <div>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <ul>
//               {students.map((student) => (
//                 <li
//                   key={student._id}
//                   style={{
//                     border: '1px solid #007bff',
//                     borderRadius: '5px',
//                     padding: '10px',
//                     marginBottom: '10px',
//                     backgroundColor: '#f0f8ff',
//                   }}
//                 >
//                   Name: {student.name}, Email: {student.email}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//       <div style={{ flex: '1' }}>
//         <h2>Books</h2>
//         <div>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <ul>
//               {books.map((book) => (
//                 <li
//                   key={book._id}
//                   style={{
//                     border: '1px solid #28a745',
//                     borderRadius: '5px',
//                     padding: '10px',
//                     marginBottom: '10px',
//                     backgroundColor: '#f8f9fa',
//                   }}
//                 >
//                   Name: {book.name}, Author: {book.author}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>
//       <div style={{ flex: '1', textAlign: 'center', marginTop: '20px' }}>
//         <Link to="/add-book" style={{ textDecoration: 'none', color: 'white', backgroundColor: '#007bff', padding: '10px 20px', borderRadius: '5px' }}>Add New Book</Link>
//       </div>
//     </div>
//   );
// };

// export default AdminHome;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch students and books data from API
    const fetchStudentsAndBooks = async () => {
      try {
        // Dummy data for demonstration
        const dummyStudents = [
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' },
          // Add more dummy students if needed
        ];

        const dummyBooks = [
          { id: 101, title: 'Book 1', author: 'Author 1' },
          { id: 102, title: 'Book 2', author: 'Author 2' },
          // Add more dummy books if needed
        ];

        // Set dummy data
        setStudents(dummyStudents);
        setBooks(dummyBooks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStudentsAndBooks();
  }, []);

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ flex: '1', marginRight: '20px' }}>
        <h2>Students</h2>
        <div>
          {students.map((student) => (
            <div
              key={student.id}
              style={{
                border: '1px solid #007bff',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f0f8ff',
              }}
            >
              <p>{student.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: '1' }}>
        <h2>Books</h2>
        <div>
          {books.map((book) => (
            <div
              key={book.id}
              style={{
                border: '1px solid #28a745',
                borderRadius: '5px',
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: '#f8f9fa',
              }}
            >
              <p>{book.title} by {book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
       <div style={{ flex: '1', textAlign: 'center', marginTop: '20px' }}>
       <Link to="/adminaddbook" style={{ textDecoration: 'none', color: 'white', backgroundColor: '#007bff', padding: '10px 20px', borderRadius: '5px' }}>Add New Book</Link>
       </div>
       </>
  );
};

export default AdminHome;

