// controllers/orderController.js
const DonationItem = require("../../models/DonationItem");
const Order = require("../../models/Order");
const User = require("../../models/User");

const createOrder = async (req, res, next) => {
  try {
    const { receiverId, itemIds } = req.body;

    // Debugging: Log the incoming data
    console.log("Received receiverId:", receiverId);
    console.log("Received itemIds:", itemIds);

    // if (!receiverId || !Array.isArray(itemIds) || itemIds.length === 0) {
    //   console.log("Invalid input data");
    //   return res.status(400).json({ message: "Invalid input data" });
    // }

    // Check if all items are available
    const items = await DonationItem.find({
      _id: { $in: itemIds },
      isAvailable: true,
    });

    // Debugging: Log the items found
    console.log("Found items:", items);

    // if (items.length !== itemIds.length) {
    //   console.log("Some items are not available");
    //   return res.status(400).json({ message: "Some items are not available" });
    // }

    // Create a new order
    const newOrder = await Order.create({
      receiver: receiverId,
      items: itemIds,
    });

    // Update the availability of the items
    await DonationItem.updateMany(
      { _id: { $in: itemIds } },
      { $set: { isAvailable: false, receiverId: receiverId } }
    );

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error in createOrder:", error); // Debugging: Log the error
    next(error);
  }
};

const getOrdersByReceiver = async (req, res, next) => {
  try {
    const receiverId = req.params.receiverId;
    const orders = await Order.find({ receiver: receiverId }).populate("items");
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("items").populate("receiver");
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

const deleteOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the availability of the items
    await DonationItem.updateMany(
      { _id: { $in: order.items } },
      { $set: { isAvailable: true, receiverId: null } }
    );

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrdersByReceiver,
  getAllOrders,
  deleteOrderById,
};
