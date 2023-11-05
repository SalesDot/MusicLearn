import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MySongs from './pages/MySongs';
import Account from './pages/Account';
import Progress from './pages/Progress';



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact component={Home} />
          <Route path='/MySongs' component={MySongs} />
          <Route path='/Progress' component={Progress} />
          <Route path='/Account' component={Account} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
