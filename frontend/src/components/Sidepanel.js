import React from 'react';

export const Sidepanel = ({ listBooks, borrowBook, returnBook}) => {
  return (
    <div className="flex-initial min-h-screen w-1/4 bg-gray-900 text-white p-4">
      <div className="flex flex-col space-y-4">
        <button onClick={listBooks} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white focus:outline-none">List Books</button>
        <button onClick={borrowBook} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white focus:outline-none">Borrow Books</button>
        <button onClick={returnBook} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white focus:outline-none">Return Books</button>
        
        
      </div>
    </div>
  );
};


