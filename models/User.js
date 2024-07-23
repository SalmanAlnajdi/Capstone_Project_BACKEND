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
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  gender: {
    type: String,
  },
  rate: {
    type: Number,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
  socialLinks: {
    type: Array,
    default: [],
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
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonationItem",
    },
  ],
  role: {
    type: String,
    default: "User",
  },
});

module.exports = mongoose.model("User", UserSchema);
