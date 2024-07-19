const Event = require("../../models/Event");
const User = require("../../models/User");

exports.getEvents = async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json(events);
  } catch (err) {
    next(err);
  }
};

exports.getEventById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("pendingRequests")
      .populate("confirmedAttendees")
      .populate("attendanceChecklist"); // this line to populate the attendance checklist

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

exports.createEvent = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const {
      name,
      images,
      description,
      date,
      time,
      address,
      city,
      state,
      zipCode,
      location,
      gender,
      maxParticipants,
      organizationId,
    } = req.body;

    // Set the owner to the authenticated user's ID
    const ownerId = req.user._id;

    // Create the new event
    const event = await Event.create({
      name,
      images,
      description,
      date,
      time,
      address,
      city,
      state,
      zipCode,
      location,
      gender,
      maxParticipants,
      owner: ownerId,
      organizationId,
    });

    // Update the owner with the new event ID
    await User.findByIdAndUpdate(req.user._id, {
      $push: { events: event._id },
    });

    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
};

exports.updateEvent = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    next(err);
  }
};

exports.deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    next(err);
  }
};
