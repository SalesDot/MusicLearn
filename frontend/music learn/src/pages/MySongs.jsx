import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Songs.css';
import { AuthContext } from '../AuthContext';

function MySongs() {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const { token } = useContext(AuthContext);
  const [userFavorites, setUserFavorites] = useState([]);
  
  // fetch all songs
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

  // render difficulty stars
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

  // search functionality
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // favourites
  const toggleFavorites = async () => {
    setShowFavorites((prevState) => !prevState);
  };

  useEffect(() => {
    async function fetchUserFavorites() {
      try {
        const response = await axios.get('http://localhost:5000/users/songs/favorites', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserFavorites(response.data);
      } catch (error) {
        console.error('Error fetching user favorites:', error);
      }
    }

    if (showFavorites) {
      fetchUserFavorites();
    }
  }, [showFavorites, token]);

  
  // sort by difficulty
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
  const getFilteredSongs = () => {
    if (showFavorites) {
      const favoriteIds = userFavorites.map((favorite) => favorite._id); // Extracting _id values
      return sortedSongs.filter((song) => favoriteIds.includes(song._id));
    }
    return sortedSongs;
  };
  const filteredSongsToDisplay = getFilteredSongs();  

  return (
    <div>
      <h1>All Songs</h1>
      <div>
      <input
        type="text"
        placeholder="Search by title or artist"
        value={searchQuery}
        onChange={handleSearch}
      />
      <button onClick={toggleFavorites}>
        {showFavorites ? 'Show All Songs' : 'Show Favorites'}
      </button>
      </div>
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
        {filteredSongsToDisplay.map((song) => (
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
