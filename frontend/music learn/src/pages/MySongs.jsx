import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Songs.css';

function MySongs() {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? 'star-filled' : 'star-empty'}
          style={{ opacity: i > rating ? 0.3 : 1 }}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [sortOrder, setSortOrder] = useState('ascending');
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === 'ascending' ? 'descending' : 'ascending'));
  };
  const sortedSongs = filteredSongs.slice().sort((a, b) => {
    if (sortOrder === 'ascending') {
      return a.difficultyRating - b.difficultyRating;
    } else {
      return b.difficultyRating - a.difficultyRating;
    }
  });


  return (
    <div>
      <h1>All Songs</h1>
      <input
        type="text"
        placeholder="Search by title or artist"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div className="song-titles">
        <span>Title</span>
        <span>Artist</span>
        <span onClick={toggleSortOrder}>
          Difficulty{''}
          {sortOrder === 'ascending' ? (
            <span>&#9660;</span>
          ) : (
            <span>&#9650;</span>
          )}
        </span>
      </div>
      <ul className="song-list">
        {filteredSongs.map((song) => (
          <li key={song._id} className="song-details">
            <Link to={`/songs/${song._id}`} className="song-link">
              {song.title}
            </Link>
            <span>{song.artist}</span>
            <span>{renderStars(song.difficultyRating)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MySongs;
