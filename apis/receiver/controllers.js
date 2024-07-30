// apis/receiver/controllers.js
const Receiver = require("../../models/Receiver");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DonationList = require("../../models/DonationList");

const generateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
    role: "receiver",
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

const signup = async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const { lastName, firstName, phone } = req.body;
    if (!lastName || !firstName || !phone) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "receiver";
    const newUser = await User.create(req.body);

    const token = generateToken(newUser);

    return res.status(201).json({ token, user: newUser });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    return res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin,
  me,
};
