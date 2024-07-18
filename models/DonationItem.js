const mongoose = require("mongoose");

const DonationItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  donationListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DonationList",
  },
});

module.exports = mongoose.model("DonationItem", DonationItemSchema);
