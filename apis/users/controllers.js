const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ganerateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
    role: "User",
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};
exports.signup = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const { lastName, firstName, phone } = req.body;
    if (!lastName || !firstName || !phone) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "User";
    const newUser = await User.create(req.body);

    const token = ganerateToken(newUser);

    return res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = await ganerateToken(req.user);
    return res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getMyProfile = async (req, res, next) => {
  try {
    console.log("here");
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateMyProfile = async (req, res, next) => {
  if (req.file) {
    req.body.image = req.file.path.replace("\\", "/");
  }

  try {
    console.log("Updating user profile with data:", req.body);

    // Validate required fields (optional, based on your requirements)
    const requiredFields = [
      "username",
      "firstName",
      "lastName",
      "phone",
      "email",
      "gender",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res
          .status(400)
          .json({ message: `Missing required field: ${field}` });
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        image: req.body.image,
        email: req.body.email,
        gender: req.body.gender,
      },
      {
        new: true,
        runValidators: true, // Ensure validation rules in the schema are applied
      }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user profile:", err);
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};
