const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artworkSchema = new Schema({
  artist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  category:{ type: Schema.Types.ObjectId, ref:'Category', required: true},
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  images:[{type: String}],
  createdAt: { type: String, required:true },
  countInStock:{type:Number,required:true}
}, {
  timestamps: true 
});

module.exports = mongoose.model('Artwork', artworkSchema);