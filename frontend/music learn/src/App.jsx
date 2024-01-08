import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MySongs from "./pages/MySongs";
import Account from "./pages/Account";
import Progress from "./pages/Progress";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SongDetails from "./components/SongDetails";
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MySongs" element={<MySongs />} />
            <Route path="/Progress" element={<Progress />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/songs/:id" element={<SongDetails />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
