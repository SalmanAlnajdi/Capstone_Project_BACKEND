const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  location: {
    type: String,
  },
  gender: {
    type: String,
  },
  maxParticipants: {
    type: Number,
  },
  userId : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  organizationId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
});

module.exports = mongoose.model("Event", EventSchema);
