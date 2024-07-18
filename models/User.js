const mongoose = require("mongoose");
const { events } = require("./Event");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  registeredEvents: {
    type: Array,
    default: [],
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "media/programmer.png",
  },
  eventId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  role: {
    type: String,
    default: "User",
  },
});

module.exports = mongoose.model("User", UserSchema);
