const express = require("express");
const { register, login, update, resetPassword } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", update)
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "Perfil acessado!", userId: req.userId });
});
router.post("/reset-password", resetPassword);



module.exports = router;
