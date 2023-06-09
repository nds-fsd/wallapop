const express = require("express");
const {
  getFavoritesByUser, createFav, deleteFav
} = require("../controllers/favoriteController");

const favoriteRouter = express.Router();

favoriteRouter.get("/:user", getFavoritesByUser);
favoriteRouter.post("/:user", createFav)
favoriteRouter.delete("/:user/:productId", deleteFav)
favoriteRouter.patch("/:user", createFav)





module.exports = favoriteRouter;
