const express = require("express");
const router = express.Router();
const VoucherController = require("../controller/voucherController");

router.post("/", VoucherController.createVoucher);
router.get("/", VoucherController.getAllVouchers);
router.get("/:id", VoucherController.getVoucherById);
router.post("/assign", VoucherController.assignVoucherToUser);
router.get("/user/:idUser", VoucherController.getUserVouchers);
router.put("/use", VoucherController.useVoucher);
router.delete("/:id", VoucherController.deleteVoucher);

module.exports = router;
