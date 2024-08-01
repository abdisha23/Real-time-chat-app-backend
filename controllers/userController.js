const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");



const generateToken = (_id) => {
  const jwtKey = process.env.JWT_SECRET;
  return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json("User already registered with this email!");
      return;
    }
    if (!name || !email || !password) {
      res.status(400).json("All fields are required!");
      return;
    }
    if (!validator.isEmail(email)) {
      res.status(400).json("Invalid email!");
      return;
    }
    if (!validator.isStrongPassword(password)) {
      res.status(400).json("Use a strong password!");
      return;
    }
    user = await User.create({ name, email, password }); 
    res.status(201).json({user});
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    let user = await User.findOne({ email });
    
    if (!user) {
      res.status(400).json({ error: "Wrong email!" });
      return;
    }
    const isPasswordMatched = await user.isPasswordMatched(password);
    if (!isPasswordMatched) {
      res.status(400).json({ error: "Wrong password!" });
      return;
    }
    if (user) {
      const token = generateToken(user?._id);
      await User.findByIdAndUpdate(
        user?._id,
        {
          token: token,
        },
        { new: true }
      );
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      await user.save();
      res.status(200).json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to login. Please try again." });
  }
};

const findUserById = async (req, res) => {
    const {userId} = req.params;
    try {
      const user = await User.findById(userId);
      if (user === null) {
        res.status(404).json({ message: 'User not found!' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error!' });
    }
  };

  const getUsers = async (req, res) => {
    try {
      const user = await User.find();
      if (user === null) {
        res.status(404).json({ message: 'User not found!' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error!' });
    }
  };

module.exports = {
     registerUser,
     loginUser,
     findUserById,
     getUsers 
    };