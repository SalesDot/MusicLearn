import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        // Login was successful
        setToken(data.token);
        console.log("User logged in successfully");
         
      } else {
        // Handle errors
        console.error("Login failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLogout = () => {
    setToken(null);
  };

  const isLoggedIn = token !== null;
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>User is logged in!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default LoginPage;
