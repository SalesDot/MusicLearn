import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import goldTrophy from './gold-trophy.png';
import silverTrophy from './silver-trophy.png';
import bronzeTrophy from './bronze-trophy.png';
function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const { token, username } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/leaderboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, [token]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
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

  return userDetails ? (
    <div className="dashboard-container">
      <div className="account-overview">
        <h2>{userDetails.username}'s dashboard</h2>
      </div>

      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h2>Leaderboard</h2>
        </div>
        <p1>Complete songs to gain points!</p1>
        <ul className="leaderboard-list">
          {leaderboard.map((user, index) => (
            <li key={index} className="leaderboard-item">
              {index === 0 && <img src={goldTrophy} alt="Gold Trophy" className="trophy gold" />}
              {index === 1 && <img src={silverTrophy} alt="Silver Trophy" className="trophy silver" />}
              {index === 2 && <img src={bronzeTrophy} alt="Bronze Trophy" className="trophy bronze" />}

              <span>{user.username}</span>
              <span>Points: {user.points}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : null;
}

export default Home;
