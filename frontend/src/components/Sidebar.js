import React from 'react';

export const Sidebar = ({ listBooks, listStudents, addBooks }) => {
  return (
    <div className="flex-initial h-screen w-1/4 bg-gray-900 text-white p-4">
      <div className="flex flex-col space-y-4">
        <button onClick={listBooks} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white focus:outline-none">List Books</button>
        <button onClick={listStudents} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white focus:outline-none">List Students</button>
        <button onClick={addBooks} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white focus:outline-none">Add Book</button>
      </div>
    </div>
  );
};


