import React from 'react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../../Pages/Home/Homepage';
import Searchpage from '../../Pages/Search/Searchpage';

export default function Sidebar() {

  return (
    <Router>
      <img src={image} className="profile-img" alt="profile" />
      <div>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search" element={<Searchpage />} />
        </Routes>
      </div>
      <div> Playlist</div>
    </Router>
  );
}
