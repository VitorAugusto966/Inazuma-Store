const express = require("express");
const { register, login, update,resetPassword,getById } = require("../controller/sellerController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", update);
router.get("/:id",getById);
router.post("/reset-password", resetPassword);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Perfil de vendedor acessado!", sellerId: req.userId });
});

module.exports = router;
