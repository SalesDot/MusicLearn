const mongoose = require('mongoose');
const Task = require('../models/task.model');
const mongoDB = "mongodb+srv://admin:simple@harveyscluster.ltgag1e.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoDB)
  .then(async () => {
    console.log('Connected to MongoDB');

    try {
      const newTask = new Task({
        taskName: "Test Task",
        body: "Here is how to complete this test!",
      });

      const savedTask = await newTask.save();
      console.log('Task saved:', savedTask);
    } catch (error) {
      console.error('Error saving task:', error);
    } finally {
      mongoose.disconnect()
        .then(() => {
          console.log('Disconnected from MongoDB');
        })
        .catch(error => {
          console.error('Error disconnecting from MongoDB:', error);
        });
    }
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
