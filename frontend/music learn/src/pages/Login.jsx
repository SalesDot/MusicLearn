import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setShowError(true);
      setErrorMessage('Please enter both a username and password');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        localStorage.setItem('token', data.token);
        console.log('User logged in successfully');
        navigate('/');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        setShowError(true);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setShowError(true);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleCloseError = () => setShowError(false);
  const isLoggedIn = token !== null;

  return (
    <div className='form'>
      {isLoggedIn ? (
        <div>
          <p>User is logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Login</button>
          </form>
          {showError && <Alert message={errorMessage} onClose={handleCloseError} />}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
