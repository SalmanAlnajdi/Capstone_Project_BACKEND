const DonationItem = require("../../models/DonationItem");
const DonationList = require("../../models/DonationList");
const Receiver = require("../../models/Receiver");

const CreateReceiver = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    // req.body.user = req.user._id;

    const reciver = await Receiver.create(req.body);

    await DonationList.findByIdAndUpdate(req.body.DonationList_id, {
      $push: { donationItemId: DonationItem._id },
    });

    return res.status(201).json(reciver);
  } catch (error) {
    next(error);
  }
};

const getAllReciever = async (req, res, next) => {
  try {
    const receiver = await Receiver.find().populate("donationItemId");

    res.status(201).json(receiver);
  } catch (error) {
    next(error);
  }
};

const DelOneReceiver = async (req, res, next) => {
  const id = req.params.id;
  try {
    const delreceiver = await Receiver.findByIdAndDelete(id, req.body);
    if (delreceiver) {
      return res.status(201).json(delreceiver);
    } else {
      return res.status(404).json({ msg: "delete receiver faild!" });
    }
  } catch (error) {
    next(error);
  }
};

const updateOneReceiver = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedreceiver = await Receiver.findByIdAndUpdate(
      id,
      req.body
    ).populate("name");
    if (updatedreceiver) {
      return res.status(201).json(updatedreceiver);
    } else {
      return res.status(404).json({ msg: "update receiver faild!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  CreateReceiver,
  getAllReciever,
  DelOneReceiver,
  updateOneReceiver,
};
