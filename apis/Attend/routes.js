const express = require("express");
const AttendeeRouter = express.Router();

const {
  markAttendance,
  handleAttendanceRequest,
  requestToAttendEvent,
} = require("./controllers");

// Attendance request routes
AttendeeRouter.post("/events/:eventId/request", requestToAttendEvent);

AttendeeRouter.post(
  "/events/:eventId/requests/:requestId",
  handleAttendanceRequest
);

AttendeeRouter.post("/events/:eventId/attendance/:userId", markAttendance);

module.exports = AttendeeRouter;
