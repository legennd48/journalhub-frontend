import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill, { Quill } from 'react-quill';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import './NewEntry.css';

import { default as Emoji } from 'quill-emoji';
import 'quill-emoji/dist/quill-emoji.js';
Quill.register('modules/emoji', Emoji);

const NewEntry = ({ createEntry }) => {
    const [formData, setFormData] = useState({
        date: new Date(),
        title: '',
        entry: '',
        file: null
    });
    const navigate = useNavigate();

    const handleDateChange = (date) => {
        setFormData({
            ...formData,
            date: date
        });
    };

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
            entry: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const entryData = {
            date: formData.date.toISOString(),
            title: formData.title,
            content: formData.entry
        };

        try {
            const response = await fetch('http://localhost:5000/journalEntries', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'userId': userId,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(entryData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const result = await response.json();
            console.log('Entry created successfully:', result);
            createEntry(result);
            navigate('/landing');
        } catch (error) {
            console.error('Error creating entry:', error.message);
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
        <div className="new-entry-container">
            <h1>Create New Entry</h1>
            <form onSubmit={handleSubmit}>
                <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <ReactQuill
                    value={formData.entry}
                    onChange={handleEditorChange}
                    placeholder="Write your entry here..."
                    modules={modules}
                    formats={formats}
                />
                <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                />
                <button type="submit">Create Entry</button>
            </form>
        </div>
    );
};

export default NewEntry;
