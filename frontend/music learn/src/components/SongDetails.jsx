import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SongDetails() {
  const { id } = useParams();
  const [song, setSong] = useState(null);

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

  if (!song) {
    return <div>Loading...</div>;
  }

  const tabSections = Object.keys(song.tab).map((sectionName, index) => (
    <div key={index}>
      <h3>{sectionName}</h3>
      <pre>{song.tab[sectionName]}</pre>
    </div>
  ));

  return (
    <div>
      <h2>{song.title}</h2>
      <p>Artist: {song.artist}</p>
      <p>Difficulty Rating: {song.difficultyRating}</p>
      <div>{tabSections}</div>
    </div>
  );
}

export default SongDetails;
