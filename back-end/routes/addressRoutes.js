const express = require("express");
const router = express.Router();
const enderecoController = require("../controller/addressController");

router.post("/:userId", enderecoController.criarEndereco);
router.get("/:userId", enderecoController.obterEndereco);
router.put("/:userId", enderecoController.atualizarEndereco);
router.delete("/:userId", enderecoController.deletarEndereco);

module.exports = router;
