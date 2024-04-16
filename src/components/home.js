// LandingPage.js
import React from 'react';
import libraryImage from '../assets/download.jpeg'; // Import your library image
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handleAdminClick = () => {
        // Redirect to admin page
        navigate('/adminsignup');
    }

    const handleUserClick = () => {
        // Redirect to user page
        navigate('/usersignup');
    }

    return (
        <div>
            <img src={libraryImage} alt="Library" />
            <h2>Welcome to the Library</h2>
            <p>Please select your role:</p>
            <button onClick={handleAdminClick}>Admin</button>
            <button onClick={handleUserClick}>User</button>
        </div>
    );
}

export default Home;
