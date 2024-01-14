const mongoose = require('mongoose');
const Song = require('../models/song.model');
const mongoDB = "mongodb+srv://admin:simple@harveyscluster.ltgag1e.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoDB)
  .then(() => {
    console.log('Connected to MongoDB');

    const newSong = new Song({
      title: "Happy Birthday",
      artist: "Marilyn Monroe",
      difficultyRating: 1,
      tab: {
        "": "A           E\nHappy Birthday to you\n",
        " ": "E           A\nHappy Birthday to you\n",
        "  ": "A7            D\nHappy Birthday dear (name)\n",
        "   ": "A        E    A\nHappy Birthday to you\n"
      }
    });


    newSong.save()
      .then(savedSong => {
        console.log('Song saved:', savedSong);
      })
      .catch(error => {
        console.error('Error saving song:', error);
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


   