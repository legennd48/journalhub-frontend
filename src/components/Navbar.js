import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/landing" className="project-name">JournalHub</Link>
            <Link to="/landing" className="nav-link">Home</Link>
            <Link to="/new-entry" className="nav-link">New Entry</Link>
            <Link to="/" className="nav-link">Logout</Link>
        </nav>
    );
};

export default Navbar;
