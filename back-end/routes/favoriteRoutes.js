const express = require("express");
const FavoriteController = require("../controller/favoriteController");

const router = express.Router();

router.post("/", FavoriteController.addFavorite);
router.delete("/", FavoriteController.removeFavorite);
router.get("/:idUser", FavoriteController.getUserFavorites);

module.exports = router;
