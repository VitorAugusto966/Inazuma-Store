const express = require("express");
const router = express.Router();
const OrderController = require("../controller/orderController");

router.post("/", OrderController.createOrder);
router.get("/:id", OrderController.getOrder);
router.get("/user/:userId", OrderController.getAllUserOrders)

module.exports = router;
