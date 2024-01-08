const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  difficultyRating: { type: Number, required: true, min: 0, max: 5 },
  tab: { type: Object, required: true },
}, { timestamps: true });

const Song = mongoose.model('Song', songSchema);

module.exports = Song;