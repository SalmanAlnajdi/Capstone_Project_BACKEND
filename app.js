const express = require("express");
const morgan = require("morgan");
const connectDB = require("./database");
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middlewares/passport");

const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));

app.use(cors());

connectDB();

app.use(express.json());

app.use(passport.initialize());
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

// Add your routes here
// Example: app.use('/users', usersRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
