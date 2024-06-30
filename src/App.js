import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Welcome from './components/Welcome';
import LandingPage from './components/LandingPage';
import NewEntry from './components/NewEntry';
import ViewEntry from './components/ViewEntry';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile'; // You need to create this component
import './App.css';

const App = () => {
  const [entries, setEntries] = useState([]);

  const createEntry = (newEntry) => {
    setEntries([...entries, { ...newEntry, id: entries.length + 1 }]);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Welcome />} />
          <Route path="/landing" element={<LandingPage entries={entries} />} />
          <Route path="/new-entry" element={<NewEntry createEntry={createEntry} />} />
          <Route path='/profile' element={<Profile />}/>
          <Route path='/login' element={<Auth />}/>
          <Route path="/edit-profile/:id" element={<EditProfile />} />
          <Route path="/view-entry/:id" element={<ViewEntry entries={entries} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;