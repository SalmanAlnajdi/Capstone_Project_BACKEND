const mongoose = require("mongoose");

const DonationListSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  createBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  donationItemId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DonationItem",
    },
  ],
});

module.exports = mongoose.model("DonationList", DonationListSchema);
