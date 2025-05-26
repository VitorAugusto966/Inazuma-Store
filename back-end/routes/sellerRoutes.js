const express = require("express");
const { register, login, update, resetPassword, getById, getPedidosBySeller } = require("../controller/sellerController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.put("/update/:id", update);
router.get("/pedidos", authMiddleware, getPedidosBySeller)
router.post("/reset-password", resetPassword);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Perfil de vendedor acessado!", sellerId: req.userId });
});
router.get("/:id", getById);

module.exports = router;
