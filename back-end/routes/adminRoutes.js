const express = require("express");
const router = express.Router();
const AdminController = require("../controller/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");

router.use(authMiddleware, isAdmin);

router.get("/dashboard", AdminController.dashboard);
router.get("/usuarios", AdminController.listarUsuarios);
router.delete("/usuarios/:id", AdminController.deletarUsuario);

router.get("/pedidos", AdminController.listarPedidos);

router.get("/cupons", AdminController.listarCupons);
router.post("/cupons", AdminController.criarCupom);
router.delete("/cupons/:id", AdminController.deletarCupom);

module.exports = router;
