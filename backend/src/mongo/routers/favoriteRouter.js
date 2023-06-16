const express = require("express");
const {
  getFavoritesByUser, postFavorite
} = require("../controllers/favoriteController");

const favoriteRouter = express.Router();

favoriteRouter.get("/getbyuser/:user", getFavoritesByUser);
favoriteRouter.post("/:user", postFavorite)



module.exports = favoriteRouter;
