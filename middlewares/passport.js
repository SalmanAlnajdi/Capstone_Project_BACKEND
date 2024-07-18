// middlewares/passport.js
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
require("dotenv").config();

const localStrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
  },
  async (username, password, next) => {
    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        return next({ msg: "Username or password is wrong!" });
      }

      const checkPassword = await bcrypt.compare(password, user.password);
      if (checkPassword == false) {
        return next({ msg: "Username or password is wrong!" });
      }
      next(false, user); //req.user
    } catch (error) {
      next(error);
    }
  }
);

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, next) => {
    // here you check if token is exp

    const user = await User.findById(payload._id);

    if (!user) {
      return next({ msg: "User not found!" });
    }

    next(false, user); // req.user
  }
);

const onlyAdmin = async (req, res, next) => {
  if (req.user.role == "Admin") {
    next();
  } else {
    next({ message: "You are not admin!!!!" });
  }
};

module.exports = { localStrategy, jwtStrategy, onlyAdmin };
