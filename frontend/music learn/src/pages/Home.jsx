import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import "./Home.css";
import goldTrophy from "./gold-trophy.png";
import silverTrophy from "./silver-trophy.png";
import bronzeTrophy from "./bronze-trophy.png";

function Home() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const { token, username } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [suggestedSongs, setSuggestedSongs] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/users/leaderboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "star-filled" : "star-empty"}
          style={{ opacity: i > rating ? 0.3 : 1 }}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchRecentPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/recent");
      setRecentPosts(response.data);
    } catch (error) {
      console.error("Error fetching recent posts:", error);
    }
  };

  const fetchSuggestedSongs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/users/suggestSongs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const allSuggestedSongs = response.data;
      const filteredSongs = allSuggestedSongs.filter(
        (song) => song.difficultyRating >= userDetails.Level
      );
      const finalSongs = filteredSongs.slice(0,3);
      setSuggestedSongs(finalSongs);
    } catch (error) {
      console.error("Error fetching suggested songs:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    fetchUserDetails();
    fetchRecentPosts();
  }, [token]);

  useEffect(() => {
    if (userDetails) {
      fetchSuggestedSongs();
    }
  }, [userDetails]);
  const handlePostChange = (e) => {
    setNewPostContent(e.target.value);
  };

  const handlePostSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:5000/users/addPost",
        { content: newPostContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewPostContent("");
      fetchRecentPosts();
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };
  if (!token) {
    return (
      <div className="welcome-message">
        <h1>Welcome to MusicLearn!</h1>
        <p>Register or Login to get started now!</p>
      </div>
    );
  }
  return userDetails ? (
    <div className="dashboard-container">
      
      <div className="suggested-song-container"><h1>Welcome to your dashboard
      </h1>
        <span><h2>Suggested Songs to Learn</h2></span>
        {suggestedSongs.map((song, index) => (
          <div key={index}>
            <h3>
              <a href={`/songs/${song._id}`}>
                {song.title}
              </a>
            </h3>
            <p>Difficulty: {renderStars(song.difficultyRating)}</p>
          </div>
        ))}
      </div>
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h2>Leaderboard</h2>
        </div>
        <p>Complete songs to gain points!</p>
        <ul className="leaderboard-list">
          {leaderboard.map((user, index) => (
            <li key={index} className="leaderboard-item">
              {index === 0 && (
                <img
                  src={goldTrophy}
                  alt="Gold Trophy"
                  className="trophy gold"
                />
              )}
              {index === 1 && (
                <img
                  src={silverTrophy}
                  alt="Silver Trophy"
                  className="trophy silver"
                />
              )}
              {index === 2 && (
                <img
                  src={bronzeTrophy}
                  alt="Bronze Trophy"
                  className="trophy bronze"
                />
              )}

              <span>{user.username}</span>
              <span>Points: {user.points}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="recent-posts-container">
        <div className="recent-posts-header">
          <h2>Recent Posts</h2>
        </div>
        <ul className="recent-posts-list">
          {recentPosts
            .filter((user) => user.posts.length > 0)
            .map((user, index) => (
              <li key={index} className="recent-posts-item">
                <div className="user-forum-posts">
                  <div className="messages">
                    <h3>Message</h3>
                    {user.posts.slice(-3).map((post, postIndex) => (
                      <p key={postIndex}>{post.content}</p>
                    ))}
                  </div>
                  <div className="author">
                    <h3>Author</h3>
                    <span>{user.username}</span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
        <div className="add-post-bar">
          <textarea
            rows="4"
            cols="50"
            value={newPostContent}
            onChange={handlePostChange}
            placeholder="Type your message here..."
          ></textarea>
          <button onClick={handlePostSubmit}>Post</button>
        </div>
      </div>
    </div>
  ) : null;
}

export default Home;
