const mongoose = require('mongoose');
const Course = require('../models/course.model');

const mongoDB = 'mongodb+srv://admin:simple@harveyscluster.ltgag1e.mongodb.net/?retryWrites=true&w=majority'; 
mongoose.connect(mongoDB);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  try {
    const courseId = '65c11ab23b8cbd142199d70b';
    const taskId = '65c11b36f04e4761b43f5c4a';

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
