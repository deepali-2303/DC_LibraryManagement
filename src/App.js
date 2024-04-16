
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  Home  from './components/home';
import { AdminSignup }from './components/admin_signup'; // Import your AdminPage component
import { AdminSignin } from './components/admin_signin'; // Import your AdminPage component
import { UserSignup } from './components/user_signup'; // Import your UserPage component
import { UserSignin } from './components/user_signin'; // Import your UserPage component
import  AdminHome  from './components/admin_home'
import  AddBook  from './components/add_book'
import  UserPage  from './components/user_page'; // Import your UserPage component
function App() {
  return (
    <>
        <Router>
          <Routes>
                <Route path="/" exact element={<Home/>} />
                <Route path="/adminsignup" element={<AdminSignup/>} />
                <Route path="/adminsignin" element={<AdminSignin/>} />
                <Route path="/usersignup" element={<UserSignup/>} />
                <Route path="/usersignin" element={<UserSignin/>} />
                <Route path="/adminhome" element={<AdminHome/>} />
                <Route path="/adminaddbook" element={<AddBook/>} />
                <Route path="/userpage" element={<UserPage/>} />
            </Routes>
        </Router>
    </>
  ); 
}

export default App;
