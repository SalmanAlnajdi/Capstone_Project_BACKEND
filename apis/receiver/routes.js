const express = require("express");

const {
  CreateReceiver,
  getAllReciever,
  DelOneReceiver,
  updateOneReceiver,
} = require("./controllers");

const upload = require("../../middlewares/multer");
const ReciverRouter = express.Router();

ReciverRouter.post("/", upload.single("image"), CreateReceiver);
ReciverRouter.get("/", upload.single("image"), getAllReciever);
ReciverRouter.delete("/:id", upload.single("image"), DelOneReceiver);
ReciverRouter.put("/:id", upload.single("image"), updateOneReceiver);

module.exports = ReciverRouter;
