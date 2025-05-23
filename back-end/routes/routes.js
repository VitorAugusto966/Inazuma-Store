const express = require("express");
const router = express.Router();
const {login} = require("../controller/loginController");

const userRoutes = require("./userRoutes");
const addressRoutes = require("./addressRoutes");
const orderRoutes = require("./orderRoutes");
const favoriteRoutes = require("./favoriteRoutes");
const voucherRoutes = require("./voucherRoutes");
const orderTracking = require("./orderTrackingRoutes");
const adminRoutes = require("./adminRoutes");
const sellerRoutes = require("./sellerRoutes");
const productRoutes = require("./productRoutes");

router.use("/users", userRoutes);
router.use("/address", addressRoutes);
router.use("/orders", orderRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/vouchers", voucherRoutes);
router.use("/tracking", orderTracking);
router.use("/admin", adminRoutes);
router.use("/sellers", sellerRoutes);
router.use("/products", productRoutes);
router.post("/login", login);


module.exports = router;
