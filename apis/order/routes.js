// apis/order/routes.js
const express = require("express");
const { createOrder, getOrdersByReceiver } = require("./controllers");

const orderRoutes = express.Router();

orderRoutes.post("/", createOrder);
orderRoutes.get("/:receiverId", getOrdersByReceiver);

module.exports = orderRoutes;
