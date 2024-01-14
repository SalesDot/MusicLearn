const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: { type: String, required: true },
    body: {type: String, required: true}
  });
  
  const Task = mongoose.model('Task', taskSchema);
module.exports = Task;