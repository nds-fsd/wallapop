const express = require("express");
const {
  getFavoritesByUser, postFav
} = require("../controllers/favoriteController");

const favoriteRouter = express.Router();

favoriteRouter.get("/getbyuser/:user", getFavoritesByUser);
// favoriteRouter.post("/:user", postFavorite)
favoriteRouter.post("/:user", postFav)

// favoriteRouter.patch("/:user", postFavorite)



module.exports = favoriteRouter;
