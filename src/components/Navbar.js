import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    alert('Logout successful');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/welcome" className='project-name'>JournalHub</Link>
      <Link to="/landing" className="nav-link">Dashboard</Link>
      <Link to="/profile" className="nav-link">Profile</Link>
      <span onClick={handleLogout} className="nav-link" role="button" tabIndex="0">Logout</span>
    </nav>
  );
};

export default Navbar;
