const mongoose = require("mongoose");

const DonationListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  donationItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DonationItem",
  },
});

module.exports = mongoose.model("DonationList", DonationListSchema);
