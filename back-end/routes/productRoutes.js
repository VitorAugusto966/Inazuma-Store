const express = require("express");
const router = express.Router();
const ProductController = require("../controller/productController");

router.get("/", ProductController.getALLProducts);
router.get("/:sellerId", ProductController.getALLProductsBySeller);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

module.exports = router;
