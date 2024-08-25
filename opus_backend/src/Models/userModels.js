const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:  { type: String,
        required:true },
  username: { type: String,
             required: true, 
             unique: true },
  email: { type: String,
           required: true, 
           unique: true },
  password: { type: String, 
              required: true },
  role: { type: String, enum: ['user', 'admin'],
         default: 'user' }
});

userSchema.pre('save', async function (next){
      if (!this.isModified('password')) {
        next();
      }
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    });


module.exports = mongoose.model('Users', userSchema);