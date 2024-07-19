const DonationItem = require("../../models/DonationItem");
const DonationList = require("../../models/DonationList");

const getAllDonationsItems = async (req, res, next) => {
  try {
    const Donations = await DonationItem.find()
      .populate("donationListId")
      .populate("receiverId");
    res.status(201).json(Donations);
  } catch (error) {
    next(error);
  }
};

const getAllList = async (req, res, next) => {
  try {
    const list = await DonationList.find()
      .populate("userId")
      .populate("donationItemId");
    res.status(201).json(list);
  } catch (error) {
    next(error);
  }
};

const CreateList = async (req, res, next) => {
  try {
    const list = await DonationList.create(req.body);
    return res.status(201).json(list);
  } catch (error) {
    next(error);
  }
};

const delOneList = async (req, res, next) => {
  const id = req.params.id;
  try {
    const dellist = await DonationList.findByIdAndDelete(id, req.body);
    if (dellist) {
      return res.status(201).json(dellist);
    } else {
      return res.status(404).json({ msg: "delete list faild!" });
    }
  } catch (error) {
    next(error);
  }
};

const updateOneList = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedlist = await DonationList.findByIdAndUpdate(id, req.body);
    if (updatedlist) {
      return res.status(201).json(updatedlist);
    } else {
      return res.status(404).json({ msg: "update list faild!" });
    }
  } catch (error) {
    next(error);
  }
};

const CreateDonation = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    // req.body.user = req.user._id;

    const donation = await DonationItem.create(req.body);

    await DonationList.findByIdAndUpdate(req.body.DonationList_id, {
      $push: { donationItemId: donation._id },
    });

    return res.status(201).json(donation);
  } catch (error) {
    next(error);
  }
};

const delOneDonationItem = async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteddonation = await DonationItem.findByIdAndDelete(id, req.body);
    if (deleteddonation) {
      return res.status(201).json(deleteddonation);
    } else {
      return res.status(404).json({ msg: "delete donation faild!" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllDonationsItems,
  CreateDonation,
  CreateList,
  getAllList,
  delOneList,
  updateOneList,
  delOneDonationItem,
};
