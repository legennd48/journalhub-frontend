// Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Add your custom styles here

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [entriesCount, setEntriesCount] = useState(0);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const result = await response.json();
                setProfileData(result.user);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        const fetchEntriesCount = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user/entries/${userId}`);
                const result = await response.json();
                setEntriesCount(result.user_entries);
            } catch (error) {
                console.error('Error fetching entries count:', error);
            }
        };

        fetchProfileData();
        fetchEntriesCount();
    }, [userId, token]);

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/profile/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.ok) {
                localStorage.clear();
                navigate('/welcome'); // Redirect to welcome page after deletion
            } else {
                console.error('Failed to delete profile');
            }
        } catch (error) {
            console.error('Error deleting profile:', error);
        }
    };

    const handleEdit = () => {
        navigate(`/edit-profile/${userId}`);
    };

    return (
        <div className="profile-page">
            {profileData ? (
                <div className="profile-container">
                    <h2>Profile</h2>
                    <p><strong>User ID:</strong> {profileData._id}</p>
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Total Entries:</strong> {entriesCount}</p>
                    <button onClick={handleEdit}>Edit Profile</button>
                    <button onClick={handleDelete}>Delete Profile</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
