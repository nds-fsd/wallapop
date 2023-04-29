const express = require("express");
const {
  getAllCategories,
  postCategory,
} = require("../controllers/categoryController");

const categoryRouter = express.Router();

// definimos la ruta y la funcion que va a utilizar de controller
categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", postCategory);

module.exports = categoryRouter;
