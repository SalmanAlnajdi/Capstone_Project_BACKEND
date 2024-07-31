// apis/donations/routes.js
const express = require("express");
const {
  getAllDonationsItems,
  CreateDonation,
  CreateList,
  getAllList,
  delOneList,
  updateOneList,
  delOneDonationItem,
  updateOneDonationItem,
  getListsByUser,
  getListById,
} = require("./controllers");
const upload = require("../../middlewares/multer");
const passport = require("passport");
const { ensureUser } = require("../../middlewares/ensureUser");

const DonationRouter = express.Router();

DonationRouter.get("/", getAllDonationsItems);
DonationRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ensureUser,
  CreateDonation
);
DonationRouter.delete("/:id", upload.single("image"), delOneDonationItem);
DonationRouter.put("/:id", upload.single("image"), updateOneDonationItem);

DonationRouter.get("/list", getAllList);
DonationRouter.get("/list/:listid", getListById);
DonationRouter.delete("/list/:id", upload.single("image"), delOneList);
DonationRouter.post(
  "/list",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ensureUser,
  CreateList
);
DonationRouter.delete(
  "/deletelist/:id",
  passport.authenticate("jwt", { session: false }),

  ensureUser,
  delOneList
);
DonationRouter.put("/list/:id", upload.single("image"), updateOneList);
DonationRouter.get(
  "/listbyuser",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  ensureUser,
  getListsByUser
);

module.exports = DonationRouter;
