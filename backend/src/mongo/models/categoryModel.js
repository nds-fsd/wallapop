const { model } = require("mongoose");
const categorySchema = require("../schemas/categorySchema");

// creamos el modelo de la entidad
const categoryModel = model("category", categorySchema);

module.exports = categoryModel;
