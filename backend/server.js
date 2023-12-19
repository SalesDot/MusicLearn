const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const users = {}; // to be replaced with db

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = { password: hashedPassword };
  res.status(201).send('User registered');
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, 'secret_key'); // string secret key
    res.json({ token });
  } else {
    res.status(400).send('Invalid credentials');
  }
});

app.get("/api", (req, res) => {
  res.json({"users": Object.keys(users)});
});

app.listen(5000);
