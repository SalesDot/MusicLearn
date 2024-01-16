const express = require('express');
const router = require('express').Router();
const Task = require('../models/task.model');


router.get('/', async (req, res) => {
    try {
      const tasks = await User.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;