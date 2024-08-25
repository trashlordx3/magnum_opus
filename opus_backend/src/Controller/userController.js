const User=require("../Models/userModels");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userProfile = require('../Models/profileModels');

dotenv.config();

const registerUser = async (req, res) => {
    const { name, username, email, password ,role} = req.body;
  
    try {
      let user = await User.findOne({email,username});
  
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      user = new User({
        name,
        username,
        email,
        password,
        role
      });
  
      await user.save();

      const newProfile = new userProfile({user:user.id});
      await newProfile.save();


       const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

      res.status(201).json({
        msg:"User registered Successfully",
        user: user,
        userProfile: newProfile
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };

 const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      let user = await User.findOne({username});
  
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) throw err;
          res.json({
            msg: "user logged in successfully",
            token: `Bearer ${token}`,
            user: user,
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  

  module.exports= { registerUser, loginUser };