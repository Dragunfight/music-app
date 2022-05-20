import React from 'react'
import { useState, useEffect } from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import { setClientToken } from '../../spotify';
import Login from '../Login/Login';
import Sidebar from '../../components/Sidebar/Sidebar';
import Player from '../../components/Player/Player';

export default function Homepage() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <Router>
      <Sidebar />
      <Player />
    </Router>
  );
}
