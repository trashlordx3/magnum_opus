const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: { type: String, required: true },
  bio: { type: String },
  profileImage: {type: String},
});

module.exports = mongoose.model('Artist', artistSchema);