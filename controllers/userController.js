const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send('Error registering user');
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).send('Error logging in');
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    if (req.file) {
      user.profilePictures.push(req.file.path);
    }

    await user.save();
    res.send('Profile updated');
  } catch (error) {
    res.status(400).send('Error updating profile');
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);
    if (!user) return res.status(404).send('User not found');

    user.profilePictures.forEach((filePath) => fs.unlinkSync(filePath));

    res.send('Profile deleted');
  } catch (error) {
    res.status(400).send('Error deleting profile');
  }
};
