const mongoose = require("mongoose");

const DonationItemSchema = new mongoose.Schema({
  //name , description , image , condition , createBy , donationListId , receiverId
  name: {
    type: String,
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
