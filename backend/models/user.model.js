const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: String, 
  favoritedSongs: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  completedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  completedTasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

  

module.exports = User;