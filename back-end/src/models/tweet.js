const mongoose = require('../database');
const autoIncrement = require('mongoose-auto-increment'); // yarn add mongoose-auto-increment

const TweetSchema = new mongoose.Schema({
  idTweet: {
    type: Number,
    require: true,
    unique: true,
  },
  text: {
    type: String,
    require: true,
    // unique: true,
  },
  latitude: {
    type: Number,
    require: true,
  },
  longitude: {
    type: Number,
    require: true,
  },
  rotulado: {
    type: Boolean,
    default: false,
  },
  categoriaRotulo: {
    type: String,
    default: '',
  }
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // }
});

autoIncrement.initialize(mongoose.connection);
TweetSchema.plugin(autoIncrement.plugin, 'Tweet');

const Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;