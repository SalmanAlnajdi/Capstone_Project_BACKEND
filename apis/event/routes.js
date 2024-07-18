const express = require("express");
const upload = require("../../middlewares/multer");
const organizationRouter = express.Router();
const {
    signup,
    signin,
    getOrganizations,
    getMyProfile,
    updateMyProfile,
} = require("./controllers");
const passport = require("passport");
const { ensureOrganization } = require("../../middlewares/ensureOrganization");


