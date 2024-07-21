const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ganerateToken = (user) => {
  const payload = {
    username: user.username,
    _id: user._id,
    role: "Admin",
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};

exports.signup = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "Admin";
    const newUser = await User.create(req.body);

    const token = ganerateToken(newUser);

    return res.status(201).json({ token });
  } catch (err) {
    console.log(err);
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
