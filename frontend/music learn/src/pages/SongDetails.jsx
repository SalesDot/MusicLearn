import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../AuthContext';

function SongDetails() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [addedToFavorites, setAddedToFavorites] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);
  const { token} = useContext(AuthContext);
  const isFavorite = userFavorites.some(favorite => favorite._id === id);


  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/songs/songs/${id}`);
        setSong(response.data);
      } catch (error) {
        console.error('Error fetching song details:', error);
      }
    };

    fetchSong();
  }, [id]);

  
  useEffect(() => {
    const fetchUserFavorites = async () => {
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
    };

    if (token) {
      fetchUserFavorites();
    }
  }, [token]);

  const addToFavorites = async () => {
    try {
      await axios.post(
        'http://localhost:5000/users/favorites/add',
        { songId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddedToFavorites(true);
    } catch (error) {
      console.error('Error adding song to favorites:', error);
    }
  };

  const removeFromFavorites = async () => {
    try {
      await axios.post(
        'http://localhost:5000/users/favorites/remove',
        { songId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddedToFavorites(false);
    } catch (error) {
      console.error('Error removing song from favorites:', error);
    }
  };

  if (!song) {
    return <div>Loading...</div>;
  }

  const tabSections = Object.keys(song.tab).map((sectionName, index) => (
    <div key={index}>
      <h6>{sectionName}</h6>
      <pre>{song.tab[sectionName]}</pre>
    </div>
  ));

  return (
    <div>
      <div><h2>{song.title}</h2>{token && !addedToFavorites && !isFavorite && (
        <button onClick={addToFavorites}>Add to Favorites</button>
      )}
      {token && (addedToFavorites || isFavorite) && (
        <button onClick={removeFromFavorites}>Remove from Favorites</button>
      )}</div>
      <p>Artist: {song.artist}</p>
      <p>Difficulty Rating: {song.difficultyRating}</p>
      <div>{tabSections}</div>
    </div>
  );
}

export default SongDetails;
