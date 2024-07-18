const express = require("express");
const {
  getAllDonationsItems,
  CreateDonation,
  CreateList,
  getAllList,
} = require("./controllers");
const upload = require("../../middlewares/multer");

const DonationRouter = express.Router();

DonationRouter.get("/", getAllDonationsItems);
DonationRouter.get("/list", getAllList);

DonationRouter.post("/", upload.single("image"), CreateDonation);
DonationRouter.post("/list", upload.single("image"), CreateList);

module.exports = DonationRouter;
