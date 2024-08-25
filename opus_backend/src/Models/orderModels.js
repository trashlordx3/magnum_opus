const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  artworks: [{ type: Schema.Types.ObjectId, ref: 'Artwork', required: true }],
  phone:{type : Number, required: true},
  province:{type : Number, required: true},
  address:{type:String, required:true},
  city:{type:String},
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
});

module.exports = mongoose.model('Order', orderSchema);
