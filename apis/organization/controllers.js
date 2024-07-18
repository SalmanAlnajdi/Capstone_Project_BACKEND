const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    const organizations = await Organization.find();
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