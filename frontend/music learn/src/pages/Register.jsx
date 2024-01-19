import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './register.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const { token, setToken } = useContext(AuthContext);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token !== null) {
      console.log('User is already logged in!');
      return;
    }
    if (!username || !email || !password || !dateOfBirth || !firstName || !lastName) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }
    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          dateOfBirth,
          firstName,
          lastName,
          bio,
        }),
      });
  
      if (response.ok) {
        // Registration was successful
        console.log("Registration Successful");
        // Redirect to login page or show success message
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className='form'>
      {token !== null ? (
        <p>User is logged in!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="Date of Birth"
          />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
          />
          <button type="submit">Register</button>
        </form>
      )}
       {token !== null && <button onClick={() => setToken(null)}>Logout</button>}
    </div>
  );
}

export default RegisterPage;
