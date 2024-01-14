const mongoose = require('mongoose');
const Course = require('../models/course.model');

const mongoDB = 'mongodb+srv://admin:simple@harveyscluster.ltgag1e.mongodb.net/?retryWrites=true&w=majority'; 
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  try {
    const courseId = '659ef4853cefd7f9df6cd106';
    const taskId = '659ef41134b7e7aed42b02a8';

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { taskIds: taskId } },
      { new: true }
    );

    console.log('Updated course:', updatedCourse);
  } catch (err) {
    console.error('Error updating course:', err);
  } finally {
    mongoose.disconnect();
  }
});
