const express = require('express');
const router = require('express').Router();
const Song = require('../models/task.model');


router.get('/', async (req, res) => {
    try {
      const tasks = await User.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;