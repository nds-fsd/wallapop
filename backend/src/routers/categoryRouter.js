const express = require("express");
const {
  getAllCategories,
  postCategory,
} = require("../mongo/controllers/categoryController");

console.log("ROUUTES CATEGORIES");

// const categories = [
//   {
//     name: "Todas las Categorias",
//     logo: "storage/todo.png",
//   },
// ];

const categoryRouter = express.Router();

// definimos la ruta y la funcion que va a utilizar de controller
categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", postCategory);

module.exports = categoryRouter;
