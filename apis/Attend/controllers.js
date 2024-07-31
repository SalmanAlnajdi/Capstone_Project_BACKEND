// apis/Attend/controllers.js
const Attendee = require("../../models/Attendee");
const Event = require("../../models/Event");

exports.requestToAttendEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    // Check if the user has already requested to attend the event
    const existingRequest = await Attendee.findOne({ userId, eventId });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "You have already requested to attend this event." });
    }

    // Create a new attendance request
    const attendee = await Attendee.create({ userId, eventId });

    // Add the request to the event's pending requests
    await Event.findByIdAndUpdate(eventId, {
      $push: { pendingRequests: attendee._id },
    });

    res
      .status(201)
      .json({ message: "Request to attend event has been submitted." });
  } catch (err) {
    next(err);
  }
};

exports.handleAttendanceRequest = async (req, res, next) => {
  try {
    const { eventId, requestId } = req.params;
    const { action } = req.body; // 'approve' or 'reject'
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the authenticated user is the owner of the event
    if (event.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message:
          "You are not authorized to approve or reject requests for this event.",
      });
    }

    // Find the attendance request
    const request = await Attendee.findById(requestId);
    if (!request || request.eventId.toString() !== eventId) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Update the status of the request
    if (action === "approve") {
      // Check if the maxParticipants limit is reached
      if (event.confirmedAttendees.length >= event.maxParticipants) {
        return res.status(400).json({
          message: "The maximum number of participants has been reached.",
        });
      }

      request.status = "approved";
      await request.save();

      // Move the request from pendingRequests to confirmedAttendees
      event.pendingRequests.pull(requestId);
      event.confirmedAttendees.push(requestId);
      await event.save();
    } else if (action === "reject") {
      request.status = "rejected";
      await request.save();

      // Remove the request from pendingRequests
      event.pendingRequests.pull(requestId);
      await event.save();
    } else {
      return res.status(400).json({ message: "Invalid action." });
    }

    res.status(200).json({ message: `Request has been ${action}ed.` });
  } catch (err) {
    next(err);
  }
};

exports.markAttendance = async (req, res, next) => {
  try {
    const { eventId, userId } = req.params;

    // Find the event
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the authenticated user is the owner of the event
    if (event.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          message: "You are not authorized to mark attendance for this event.",
        });
    }

    // Check if the user is a confirmed attendee
    if (!event.confirmedAttendees.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is not a confirmed attendee." });
    }

    // Check if the user is already marked as attended
    if (event.attendanceChecklist.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is already marked as attended." });
    }

    // Add the user to the attendance checklist
    event.attendanceChecklist.push(userId);
    await event.save();

    res.status(200).json({ message: "Attendance marked successfully." });
  } catch (err) {
    next(err);
  }
};





