const express = require('express');
const router = require('express').Router();
const Song = require('../models/song.model');

  router.post('/songs', async (req, res) => {
    try {
      const { title, artist, difficultyRating, tab } = req.body;
      if (!title || !artist || !difficultyRating || !tab) {
        return res.status(400).json({ message: 'Please provide all required fields: title, artist, difficultyRating, tab' });
      }
  
      const newSong = new Song({
        title,
        artist,
        difficultyRating,
        tab,
      });
  
      const savedSong = await newSong.save();
      res.status(201).json(savedSong);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/songs/:id', async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);
      if (!song) {
        return res.status(404).json({ message: 'Song not found' });
      }
      res.json(song);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/songs', async (req, res) => {
    try {
      let query = Song.find();
  
      if (req.query.sort === 'alphabetical') {
        query = query.sort({ title: 1 });
      }
  
      if (req.query.sort === 'difficulty') {
        query = query.sort({ difficultyRating: 1 });
      }
  
      const songs = await query.exec();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
module.exports = router;