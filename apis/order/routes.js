// apis/order/routes.js
const express = require("express");
const {
  createOrder,
  getOrdersByReceiver,
  getAllOrders,
  deleteOrderById,
} = require("./controllers");

const orderRoutes = express.Router();

orderRoutes.post("/", createOrder);
orderRoutes.get("/:receiverId", getOrdersByReceiver);
orderRoutes.get("/", getAllOrders);
orderRoutes.delete("/:orderId", deleteOrderById);

module.exports = orderRoutes;
