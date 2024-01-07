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
  }, {timestamps: true,});
  
  const User = mongoose.model('User', userSchema);
  

module.exports = User;

//songsCompleted: [{ type: Schema.Types.ObjectId, ref: 'Song' }], 
    // coursesCompleted: [{ type: Schema.Types.ObjectId, ref: 'Course' }], 
    // enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }], 