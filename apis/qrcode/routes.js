const express = require("express");
const QRCode = require("qrcode");
const Event = require("../../models/Event");
const User = require("../../models/User");

const Qrrouter = express.Router();

// Endpoint to generate QR code
Qrrouter.get("/generate-qrcode", async (req, res) => {
  try {
    let { eventId, userId } = req.query;

    //if you want to test the qrcode without user and event
    //just coment from here and use in param any event and user name

    if (!eventId || !userId) {
      return res.status(400).json({ msg: "Event ID and User ID are required" });
    }

    // Trim the eventId and userId to remove any extraneous whitespace or newline characters
    eventId = eventId.trim();
    userId = userId.trim();

    const event = await Event.findById(eventId); //this to find event in schemaa
    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }
    const user = await User.findById(userId); // this fo find user in schema
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    //to here

    // URL to be encoded in the QR code
    const attendanceUrl = `http://localhost:8000/api/attend?eventId=${eventId}&userId=${userId}&eventName=${encodeURIComponent(
      event.name
    )}&userName=${encodeURIComponent(user.username)}`;

    // Generate QR code
    const qrCode = await QRCode.toDataURL(attendanceUrl);

    // Return the QR code as a response
    res.status(200).json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ msg: "Failed to generate QR code" });
  }
});

// Endpoint to display event and user names
Qrrouter.get("/attend", (req, res) => {
  console.log("Attend route hit");
  const { eventId, userId, eventName, userName } = req.query;
  if (!eventId || !userId || !eventName || !userName) {
    console.log("Invalid QR Code");
    return res.status(400).send("Invalid QR Code");
  }

  res.send(`
      <h1>Event Attendance</h1>
      <p>User: ${decodeURIComponent(userName)}</p>
      <p>Event: ${decodeURIComponent(eventName)}</p>
    `);
});

module.exports = Qrrouter;
