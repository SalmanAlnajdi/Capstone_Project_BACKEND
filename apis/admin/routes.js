// apis/admin/routes.js
const express = require("express");
const upload = require("../../middlewares/multer");
const adminRouter = express.Router();

const {
  signup,
  signin,
  getAdmins,
  getMyProfile,
  updateMyProfile,
} = require("./controllers");
const passport = require("passport");
const { ensureAdmin } = require("../../middlewares/ensureAdmin");

adminRouter.post("/signup", upload.single("image"), signup);
adminRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  ensureAdmin,
  signin
);

module.exports = adminRouter;
