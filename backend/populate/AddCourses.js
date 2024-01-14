const mongoose = require('mongoose');
const Course = require('../models/course.model');

const mongoDB = "mongodb+srv://admin:simple@harveyscluster.ltgag1e.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoDB)
  .then(() => {
    console.log('Connected to MongoDB');

    const newCourse = new Course({
      courseName: "Test Course",
      difficultyLevel: 2,
      songs: [],
      tasks: ['659ef41134b7e7aed42b02a8'],
    });

    newCourse.save()
      .then(savedCourse => {
        console.log('Course saved:', savedCourse);
      })
      .catch(error => {
        console.error('Error saving course:', error);
      })
      .finally(() => {
        mongoose.disconnect()
          .then(() => {
            console.log('Disconnected from MongoDB');
          })
          .catch(error => {
            console.error('Error disconnecting from MongoDB:', error);
          });
      });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
