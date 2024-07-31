// apis/organization/controllers.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Event = require("../../models/Event");
const Attendee = require("../../models/Attendee");
const User = require("../../models/User");

const ganerateToken = (organization) => {
  const payload = {
    username: organization.username,
    _id: organization._id,
  };

  return jwt.sign(payload, process.env.JWT_SECRET);
};
exports.signup = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.role = "Organization";
    const newOrganization = await User.create(req.body);

    const token = ganerateToken(newOrganization);

    return res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const token = await ganerateToken(req.user);
    return res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getOrganizations = async (req, res, next) => {
  try {
    const organizations = await User.find({ role: "Organization" });

    res.status(201).json(organizations);
  } catch (err) {
    next(err);
  }
};

exports.getMyProfile = async (req, res, next) => {
  try {
    const organization = await Organization.findById(
      req.organization._id
    ).select("-password");
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json(organization);
  } catch (err) {
    next(err);
  }
};

exports.updateMyProfile = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);

    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const organization = await Organization.findByIdAndUpdate(
      req.organization._id,
      req.body,
      {
        new: true,
      }
    );
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json(organization);
  } catch (err) {
    next(err);
  }
};

exports.updateMyProfile = async (req, res, next) => {
  if (req.file) {
    console.log(req.file);
    req.body.image = req.file.path.replace("\\", "/");
  }
  try {
    const organization = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json(organization);
  } catch (err) {
    next(err);
  }
};

exports.getOrganizationById = async (req, res, next) => {
  try {
    const organization = await User.findById(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json(organization);
  } catch (err) {
    next(err);
  }
};

exports.deleteOrganization = async (req, res, next) => {
  try {
    const organization = await User.findByIdAndDelete(req.params.id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getAllVolunteers = async (req, res, next) => {
  try {
    const volunteers = await User.find({ role: "user" });
    res.status(201).json(volunteers);
  } catch (err) {
    next(err);
  }
};

exports.getVolunteersByOrganization = async (req, res, next) => {
  try {
    const organizationId = req.user._id;

    // Find events by the organization
    const events = await Event.find({ organizationId })
      .populate({
        path: "confirmedAttendees",
        populate: {
          path: "userId",
          select: "username email firstName lastName",
        },
      })
      .select("name confirmedAttendees");

    // Aggregate volunteers
    const volunteers = events.reduce((acc, event) => {
      event.confirmedAttendees.forEach((attendee) => {
        acc.push({
          eventName: event.name,
          username: attendee.userId.username,
          email: attendee.userId.email,
          firstName: attendee.userId.firstName,
          lastName: attendee.userId.lastName,
        });
      });
      return acc;
    }, []);

    res.status(200).json(volunteers);
  } catch (err) {
    next(err);
  }
};
