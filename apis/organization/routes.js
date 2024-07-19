const express = require("express");
const upload = require("../../middlewares/multer");
const organizationRouter = express.Router();

const {
  signup,
  signin,
  getOrganizations,
  getMyProfile,
  updateMyProfile,
  getOrganizationById,
} = require("./controllers");
const passport = require("passport");
const { ensureOrganization } = require("../../middlewares/ensureOrganization");

organizationRouter.post("/signup", upload.single("image"), signup);
organizationRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  ensureOrganization,
  signin
);
organizationRouter.get("/", getOrganizations);
organizationRouter.get(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  ensureOrganization,
  getMyProfile
);
organizationRouter.put(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ensureOrganization,
  updateMyProfile
);

organizationRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ensureOrganization,
  getOrganizationById
);

module.exports = organizationRouter;
