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
} = require("./controllers");
const upload = require("../../middlewares/multer");

const DonationRouter = express.Router();

DonationRouter.get("/", getAllDonationsItems);
DonationRouter.post("/", upload.single("image"), CreateDonation);
DonationRouter.delete("/:id", upload.single("image"), delOneDonationItem);
DonationRouter.put("/:id", upload.single("image"), updateOneDonationItem);

DonationRouter.get("/list", getAllList);
DonationRouter.delete("/list/:id", upload.single("image"), delOneList);
DonationRouter.post("/list", upload.single("image"), CreateList);
DonationRouter.delete("/list/:id", upload.single("image"), delOneList);
DonationRouter.put("/list/:id", upload.single("image"), updateOneList);

module.exports = DonationRouter;
