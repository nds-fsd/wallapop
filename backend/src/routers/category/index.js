const express = require("express");

//importamos el fichero con los datos que necesita nuestro Router
const { categories } = require("../../data/index");
const categories = require("../mongo/schemas/categories");


const categoriesRouter = express.Router();

categoriesRouter.get("/categories", (req, res) => {
  console.log("ruta categories");

  res.status(200).json(categories);
});
