import React from 'react';

export const ListStudents = ({ students }) => {
  return (
    <div className="flex justify-center">
      <div className=" p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Students</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Books</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
                <td className="px-4 py-2">{student.name}</td>
                <td className="px-4 py-2">{student.email}</td>
                <td className='px-4 py-2'>{student.books}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


