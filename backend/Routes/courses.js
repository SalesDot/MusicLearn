const express = require('express');
const router = express.Router();
const Course = require('../models/course.model');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new course
router.post('/add', async (req, res) => {
  const { courseName, difficultyLevel } = req.body;

  try {
    const newCourse = new Course({ courseName, difficultyLevel });
    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
