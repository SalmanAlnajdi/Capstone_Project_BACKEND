const express = require("express");
const upload = require("../../middlewares/multer");
const userRouter = express.Router();

const {
  signup,
  signin,
  getUsers,
  getMyProfile,
  updateMyProfile,
  deleteUser,
  getUserById,
} = require("./controllers");
const passport = require("passport");
const { onlyAdmin } = require("../../middlewares/passport");
const { ensureUser } = require("../../middlewares/ensureUser");

userRouter.post("/signup", upload.single("image"), signup);
userRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  ensureUser,
  signin
);
userRouter.get("/", getUsers);

userRouter.get(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  ensureUser,
  getMyProfile
);

userRouter.put(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ensureUser,
  updateMyProfile
);

userRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  ensureUser,
  getUserById
);

userRouter.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  ensureUser,
  deleteUser
);

module.exports = userRouter;
