import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/Duke-of-Humfreys-Library-Harry-Potter-12.jpg';
export const HomePage = () => {
  return (
    
    <div className="relative flex flex-col items-center justify-center h-screen">
      {/* Apply blur effect to the pseudo-element */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(5px)', // Adjust the blur intensity as needed
        }}
      ></div>
      <div className="z-10 flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold text-white mb-8">Welcome to Library</h1>
        <div className="flex space-x-4">
          <Link to="/loginAdmin" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Login as Admin
          </Link>
          <Link to="/loginStudent" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
            Login as Student
          </Link>
        </div>
      </div>
    </div>
  );
};
