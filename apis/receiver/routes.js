// apis/receiver/routes.js
const express = require("express");
const { signup, signin, me } = require("./controllers");
const upload = require("../../middlewares/multer");
const passport = require("passport");

const ReciverRouter = express.Router();

ReciverRouter.post("/signup", upload.single("image"), signup);
ReciverRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);

ReciverRouter.get("/me", passport.authenticate("jwt", { session: false }), me);

module.exports = ReciverRouter;
