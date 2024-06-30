// Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Add your custom styles here

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/profile/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }
                const result = await response.json();
                setProfileData(result.user);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        
        fetchProfileData();
    }, [userId]);

    const handleDeleteProfile = async () => {
        try {
            const response = await fetch(`http://localhost:5000/profile/${userId}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete profile');
            }
            const result = await response.json();
            console.log(result.message);
            localStorage.clear(); // Clear local storage
            navigate('/'); // Redirect to home page after deletion
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    };

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <p><strong>Name:</strong> {profileData.name}</p>
            <p><strong>Email:</strong> {profileData.email}</p>
            <p><strong>User ID:</strong> {profileData._id}</p>
            <button onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
    );
};

export default Profile;
