const mongoose = require('mongoose');
const Course = require('../models/course.model');

const mongoDB = 'mongodb+srv://admin:simple@harveyscluster.ltgag1e.mongodb.net/?retryWrites=true&w=majority'; 
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  try {
    const courseId = '65c22cc303e754d492be297b';
    const taskId = '65c22d03cb11f3f2ab9c594b';

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
