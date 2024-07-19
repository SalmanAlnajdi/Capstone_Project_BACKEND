const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attendee" }],
  confirmedAttendees: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Attendee" },
  ],
  attendanceChecklist: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Event", EventSchema);
