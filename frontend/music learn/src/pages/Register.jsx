import React, { useState } from 'react';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        // Registration was successful
        console.log("Registration Succesful");
        // Redirect to login page or show success message
      } else {
        // Handle errors, e.g., username already taken
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
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
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterPage;
