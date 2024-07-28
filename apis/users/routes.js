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
  updateUserProfile,
} = require("./controllers");
const passport = require("passport");
const { onlyAdmin } = require("../../middlewares/passport");
const { ensureUser } = require("../../middlewares/ensureUser");
userRouter.use((req, res, next) => {
  console.log("first111");
  next();
});
userRouter.post("/signup", upload.single("image"), signup);
userRouter.use((req, res, next) => {
  console.log("first222");
  next();
});
userRouter.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  ensureUser,
  signin
);
userRouter.use((req, res, next) => {
  console.log("first333");
  next();
});
userRouter.get("/", getUsers);
userRouter.use((req, res, next) => {
  console.log("first444");
  next();
});
userRouter.get(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  ensureUser,
  getMyProfile
);
userRouter.use((req, res, next) => {
  console.log("first555");
  next();
});

userRouter.put(
  "/myprofile",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ensureUser,
  updateMyProfile
);

userRouter.use((req, res, next) => {
  console.log("first666");
  next();
});
userRouter.put(
  "/myprofile/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  updateUserProfile
);
userRouter.use((req, res, next) => {
  console.log("first777");
  next();
});
userRouter.get(
  "/myprofile/:id",
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
