const mongoose = require('mongoose');
const Song = require('../models/song.model');
const mongoDB = "mongodb+srv://admin:simple@harveyscluster.ltgag1e.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoDB)
  .then(() => {
    console.log('Connected to MongoDB');

    const newSong = new Song({
      title: "Don't Look Back into the Sun",
      artist: "The Libertines",
      difficultyRating: 1,
      tab: {
        "intro": "Em D C D Am Bm G C G",
        "verse1": "Em D C D\nDon't look back into the Sun, now that you know that your time has come,\nAm Bm G C\nAnd they said it would never come for you.",
        "chorus1": "G D (Strum each several times)\noh my friend you havent changed looking rough and living strange\nAm Bm G C\nand I know that you've got a taste for it too",
        "chorus2": "C G\nThey'll never forgive you but they won't let you go   (Oh No)\nC\nNo she'll never forgive you but she wont let you go, oh no",
        "verse2": "Em D C D\nDon't look back into the Sun, you got your past, but you are on the run,\nAm Bm G C\nI know the lies you said who did you say",
        "chorus3": "G D\nThey'll never forgive you but they won't let you go   (Oh No)\nC\nNo she'll never forgive you but she wont let you go, oh no",
        "verse3": "Em D C D\nDon't look back into the Sun, you got your past, but you are on the run,\nAm Bm G C\nI know the lies you said who did you say",
        "outro": "Em D C D Am Bm G C G"
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
