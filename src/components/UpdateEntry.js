import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import './UpdateEntry.css';

import { default as Emoji } from 'quill-emoji';
import 'quill-emoji/dist/quill-emoji.js';
Quill.register('modules/emoji', Emoji);

const UpdateEntry = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

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
                    setFormData({
                        title: data.title,
                        content: data.content
                    });
                } else {
                    console.error('Failed to fetch entry', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching entry:', error);
            }
        };

        fetchEntry();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEditorChange = (value) => {
        setFormData({
            ...formData,
            content: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const entryData = {
            title: formData.title,
            content: formData.content
        };

        try {
            const response = await fetch(`http://localhost:5000/journalEntries/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entryData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            alert('Entry updated successfully');
            navigate('/landing');
        } catch (error) {
            console.error('Error updating entry:', error.message);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['emoji'],
            ['clean']
        ],
        'emoji-toolbar': true,
        'emoji-textarea': false,
        'emoji-shortname': true
    };

    const formats = [
        'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'align', 'link', 'image', 'video', 'emoji'
    ];

    return (
        <div className="update-entry-container">
            <form onSubmit={handleSubmit} className="update-entry-form">
                <h2>Update Entry</h2>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <ReactQuill
                    value={formData.content}
                    onChange={handleEditorChange}
                    placeholder="Update your entry here..."
                    modules={modules}
                    formats={formats}
                />
                <button type="submit" className="update-entry-button">Update Entry</button>
            </form>
        </div>
    );
};

export default UpdateEntry;
