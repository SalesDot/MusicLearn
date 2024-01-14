const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
require('dotenv').config();

app.use(cors());


const mongoDB = process.env.ATLAS_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("connected to mongodb")
}

const userRoute = require('./Routes/users');
const songRoute = require('./Routes/songs');
const courseRoute = require('./Routes/courses');
const taskRoute = require('./Routes/tasks');

app.use('/Users', userRoute);
app.use('/Songs', songRoute);
app.use('/Courses', courseRoute);
app.use('/tasks', taskRoute);


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
