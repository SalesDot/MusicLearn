import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import MySongs from './pages/MySongs';
import Account from './pages/Progress';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/MySongs' component={MySongs} />
          <Route path='/Progress' component={Progress} />
          <Route path='/Account' component={Account} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
