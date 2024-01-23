const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Song = require('../models/song.model');

// Get list of all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decodedToken = jwt.verify(token, 'your_secret_key');
    const user = await User.findOne({ username: decodedToken.username }, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// register
router.post('/register', async (req, res) => {
  const {
    username,
    email,
    password,
    dateOfBirth,
    firstName,
    lastName,
    bio
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      dateOfBirth,
      firstName,
      lastName,
      bio
    });
    
    await newUser.save();
    res.json('User added');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await User.find({})
      .sort({ points: -1 })
      .limit(10);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/songs/favorites', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }
    const decodedToken = jwt.verify(token, 'your_secret_key');
    
    const user = await User.findOne({ username: decodedToken.username }, { password: 0 }).populate('favoritedSongs');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const favoriteSongs = user.favoritedSongs;

    res.json(favoriteSongs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/favorites/add', async (req, res) => {
  try {

    const token = req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }
    const decodedToken = jwt.verify(token, 'your_secret_key');

    const { songId } = req.body;
    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    const user = await User.findOneAndUpdate(
      { username: decodedToken.username },
      { $addToSet: { favoritedSongs: songId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Song added to favorites successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/favorites/remove', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }
    
    const decodedToken = jwt.verify(token, 'your_secret_key');
    
    const { songId } = req.body;

    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const user = await User.findOneAndUpdate(
      { username: decodedToken.username },
      { $pull: { favoritedSongs: songId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Song removed from favorites successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/completedCourses', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decodedToken = jwt.verify(token, 'your_secret_key');

    const user = await User.findOne({ username: decodedToken.username }, { completedCourses: 1 });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ completedCourses: user.completedCourses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/completeSong', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decodedToken = jwt.verify(token, 'your_secret_key');

    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { songId } = req.body;
    if (!songId) {
      return res.status(400).json({ message: 'Song ID is missing' });
    }

    const song = await Song.findById(songId);

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    const user = await User.findOneAndUpdate(
      { username: decodedToken.username },
      {
        $addToSet: { completedSongs: songId },
        $inc: { points: song.difficultyRating },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Song completed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/completeTask', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decodedToken = jwt.verify(token, 'your_secret_key');

    const { taskId } = req.body;
    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findOneAndUpdate(
      { username: decodedToken.username },
      { $addToSet: { completedTasks: taskId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Task completed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/completeCourse', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    const decodedToken = jwt.verify(token, 'your_secret_key');

    if (!decodedToken) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is missing' });
    }

    const user = await User.findOneAndUpdate(
      { username: decodedToken.username },
      { $addToSet: { completedCourses: courseId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Course completed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;