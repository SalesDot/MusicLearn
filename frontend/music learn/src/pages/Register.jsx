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
  const [Level, setLevel] = useState(1);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
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
          Level,
        }),
      });

      if (response.ok) {
        console.log('Registration Successful');
        setRegistrationSuccess(true);
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const resetForm = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setDateOfBirth('');
    setFirstName('');
    setLastName('');
    setBio('');
    setLevel(1);
    setRegistrationSuccess(false);
  };

  return (
    <div className="main">
      {registrationSuccess ? (
        <div>
          <p>Registration successful</p>
          <button onClick={resetForm}>Register Again</button>
        </div>
      ) : (
        <div className="form">
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
              <label>
                Level:
                <select value={Level} onChange={(e) => setLevel(Number(e.target.value))}>
                  <option value={1}>New</option>
                  <option value={2}>Beginner</option>
                  <option value={3}>Intermediate</option>
                  <option value={4}>Advanced</option>
                  <option value={5}>Expert</option>
                </select>
              </label>
              <button type="submit">Register</button>
            </form>
          )}
          {token !== null && <button onClick={() => setToken(null)}>Logout</button>}
        </div>
      )}
    </div>
  );
}

export default RegisterPage;
