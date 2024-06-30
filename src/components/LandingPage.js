import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './LandingPage.css';

// Set app element for accessibility
Modal.setAppElement('#root');

const LandingPage = () => {
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchProfileData = async () => {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');

            if (!userId || !token) {
                console.error("User ID or token is missing");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserName(data.user.name);
                } else {
                    console.error("Failed to fetch profile data", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching profile data", error);
            }
        };

        const fetchEntries = async () => {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');

            if (!userId || !token) {
                console.error("User ID or token is missing");
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/journalEntries/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'userId': userId
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data && Array.isArray(data)) {
                        setEntries(data);
                    } else {
                        console.error("Data is not an array or is undefined", data);
                        setEntries([]);
                    }
                } else {
                    console.error("Failed to fetch entries", response.statusText);
                    setEntries([]);
                }
            } catch (error) {
                console.error("Error fetching entries", error);
                setEntries([]);
            }
        };

        fetchProfileData();
        fetchEntries();
    }, []);

    const openPopup = (entry) => {
        setSelectedEntry(entry);
    };

    const closePopup = () => {
        setSelectedEntry(null);
    };

    return (
        <div>
            <h1>Welcome, {userName}</h1>
            <h2>My Journal Entries</h2>
            <Link to="/new-entry">Create New Entry</Link>
            <div className="entries-list">
                {entries.length === 0 ? (
                    <p>You have no entries yet!</p>
                ) : (
                    entries.map((entry) => (
                        <div key={entry._id} className="entry">
                            <h2>{entry.title}</h2>
                            <p>Date: {new Date(entry.createdAt).toLocaleDateString()}</p>
                            <button onClick={() => openPopup(entry)}>View Entry</button>
                        </div>
                    ))
                )}
            </div>

            {selectedEntry && (
                <Modal
                    isOpen={!!selectedEntry}
                    onRequestClose={closePopup}
                    contentLabel="View Entry"
                    className="modal"
                    overlayClassName="modal-overlay"
                >
                    <h2>{selectedEntry.title}</h2>
                    <p>Date: {new Date(selectedEntry.createdAt).toLocaleDateString()}</p>
                    <div dangerouslySetInnerHTML={{ __html: selectedEntry.content }} className="entry-content" />
                    {selectedEntry.file && <a href={selectedEntry.file} download>Download File</a>}
                    <button onClick={closePopup}>Close</button>
                </Modal>
            )}
        </div>
    );
};

export default LandingPage;
