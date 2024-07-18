// const mongoose = require("mongoose");

// const OrganizationSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//   },

//   eventId: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Event",
//     },
//   ],
//   role: {
//     type: String,
//     default: "Organization",
//   },
// });

// module.exports = mongoose.model("Organization", OrganizationSchema);
