import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MySongs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await axios.get('http://localhost:5000/songs/songs');
        setSongs(response.data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    }
    fetchSongs();
  }, []);

  return (
    <div>
      <h1>All Songs</h1>
      <ul>
        {songs.map((song) => (
          <li key={song._id}>
            <Link to={`/songs/${song._id}`}>{song.title} by {song.artist}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MySongs;
