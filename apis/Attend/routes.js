// apis/Attend/routes.js
const express = require("express");
const AttendeeRouter = express.Router();

const {
  markAttendance,
  handleAttendanceRequest,
  requestToAttendEvent,
} = require("./controllers");
const passport = require("passport");
const { ensureUser } = require("../../middlewares/ensureUser");

// Attendance request routes
AttendeeRouter.post(
  "/:eventId/request",
  passport.authenticate("jwt", { session: false }),
  ensureUser,
  requestToAttendEvent
);

AttendeeRouter.post(
  "/:eventId/requests/:requestId",
  handleAttendanceRequest
);

AttendeeRouter.post("/:eventId/attendance/:userId", markAttendance);

module.exports = AttendeeRouter;
