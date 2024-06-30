// Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'; // Add your custom styles here

const Welcome = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Adjust the path if needed
    };

    return (
        <div className="welcome-page">
            <div className="welcome-container">
                <h1>Welcome to JournalHub</h1>
                <p>JournalHub is a web application that helps you keep track of your thoughts, ideas, and daily experiences. With JournalHub, you can:</p>
                <ul>
                    <li>Write and save journal entries</li>
                    <li>Organize your entries by date</li>
                    <li>Edit and delete your entries</li>
                    <li>View statistics about your entries</li>
                </ul>
                <button onClick={handleLogin}>Get Started</button>
            </div>
        </div>
    );
};

export default Welcome;
