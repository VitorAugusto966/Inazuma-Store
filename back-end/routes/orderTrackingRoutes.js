const express = require("express");
const OrderTrackingController = require("../controller/orderTrackingController");

const router = express.Router();


router.post("/", OrderTrackingController.addTrackingEntry);
router.get("/:orderId", OrderTrackingController.getTrackingByOrder);
router.get("/:orderId/latest", OrderTrackingController.getLatestTrackingStatus);

module.exports = router;
