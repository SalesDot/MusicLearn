const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

// register a new user
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
    // Hash the password before saving it
    
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

module.exports = router;