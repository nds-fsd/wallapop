const express = require("express");
const categoryModel = require("../models/categoryModel");
const { getAll, createOne } = require("../../services/crud-service");

// Definimos el CRUD todas las funciones para poder llamarlas en el Router

// Get para obtener todas las categorias
const getAllCategories = getAll({
  populationFields: [],
  entity: "category",
  model: categoryModel,
});

// Crear categorias
const postCategory = createOne({
  model: categoryModel,
  requiredKeys: ["title", "logo", "path"],
});

module.exports = {
  getAllCategories,
  postCategory,
};
