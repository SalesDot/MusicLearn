const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: { type: String, required: true },
    difficultyLevel: { type: Number, required: true },
    songIds: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
    taskIds: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  });
  
  const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
