const mongoose = require("mongoose");

const ReceiverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // unique: true,
    // required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  donationItemId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonationItem",
    },
  ],
});

module.exports = mongoose.model("Receiver", ReceiverSchema);
