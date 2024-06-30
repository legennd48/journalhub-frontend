import React from 'react';
import { useParams } from 'react-router-dom';
import './ViewEntry.css';

const ViewEntry = ({ entries }) => {
    const { id } = useParams();
    const entry = entries.find(e => e.id === parseInt(id));

    if (!entry) {
        return <p>You have no entries yet!</p>;
    }

    return (
        <div className="entry-content">
            <h1>{entry.title}</h1>
            <p>Date: {entry.date}</p>
            <div dangerouslySetInnerHTML={{ __html: entry.content }} />
            {entry.file && <a href={entry.file} download>Download File</a>}
        </div>
    );
};

export default ViewEntry;
