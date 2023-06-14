const express = require("express");
const {
  getFavoritesByUser, postFav, createFav, deleteFav
} = require("../controllers/favoriteController");

const favoriteRouter = express.Router();

favoriteRouter.get("/:user", getFavoritesByUser);
favoriteRouter.post("/:user", createFav)
favoriteRouter.delete("/:user", deleteFav)



module.exports = favoriteRouter;
