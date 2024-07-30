// models/DonationItem.js
const mongoose = require("mongoose");

const DonationItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  condition: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  donationListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DonationList",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Receiver",
  },
});

module.exports = mongoose.model("DonationItem", DonationItemSchema);
