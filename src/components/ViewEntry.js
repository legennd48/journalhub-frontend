import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './ViewEntry.css';

// Set app element for accessibility
Modal.setAppElement('#root');

const ViewEntry = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [entry, setEntry] = useState(null);

    useEffect(() => {
        const fetchEntry = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`http://localhost:5000/journalEntries/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setEntry(data);
                } else {
                    console.error('Failed to fetch entry', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching entry:', error);
            }
        };

        fetchEntry();
    }, [id]);

    const deleteEntry = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:5000/journalEntries/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                navigate('/landing');
            } else {
                const errorData = await response.json();
                console.error("Failed to delete entry", errorData.error);
            }
        } catch (error) {
            console.error("Error deleting entry", error);
        }
    };

    const navigateToUpdateEntry = () => {
        navigate(`/update-entry/${id}`);
    };

    if (!entry) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{entry.title}</h2>
            <p>Date: {new Date(entry.createdAt).toLocaleDateString()}</p>
            <div dangerouslySetInnerHTML={{ __html: entry.content }} className="entry-content" />
            {entry.file && <a href={entry.file} download>Download File</a>}
            <button onClick={navigateToUpdateEntry}>Update Entry</button>
            <button onClick={deleteEntry} className="delete-button">Delete Entry</button>
        </div>
    );
};

export default ViewEntry;
