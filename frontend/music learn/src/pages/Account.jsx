import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Account() {
  const { token, setToken } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        navigate('/Login');
      }
    };

    if (token) {
      fetchUserDetails();
    } else {
      navigate('/Login');
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>Account Information</h1>
      {userDetails ? (
        <div>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          <p>Date of Birth: {userDetails.dateOfBirth ? new Date(userDetails.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
          <p>First Name: {userDetails.firstName}</p>
          <p>Last Name: {userDetails.lastName}</p>
          <p>Bio: {userDetails.bio}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Account;
