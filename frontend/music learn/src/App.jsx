import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MySongs from "./pages/MySongs";
import Account from "./pages/Account";
import Progress from "./pages/Progress";
//import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };


  return (
    <>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MySongs" element={<MySongs />} />
            <Route path="/Progress" element={<Progress />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </Router>
      
    </>
  );
}

export default App;
