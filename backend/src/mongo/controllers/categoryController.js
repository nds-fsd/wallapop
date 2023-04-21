const express = require("express");
const categoryModel = require("../models/categoryModel");

// Definimos el CRUD todas las funciones para poder llamarlas en el Router
const getAllCategories = async (req, res) => {
  try {
    const allCategories = await categoryModel.find();
    res.status(200).json(allCategories);
  } catch (error) {
    res.status(500).json({ error: "Error en las categorias" });
  }
};

const postCategory = async (req, res) => {
  const { title, logo } = req.body;
  try {
    const catExist = await categoryModel.find({ title });
    // si existe mandamos un error
    if (catExist.length > 0) {
      res.status(500).json({ error: "Ya existe esta categoria" });
    } else {
      // sino existe creamos una nueva categoria
      const cat = new categoryModel({ title, logo });
      const newCat = await cat.save();
      res.status(201).json(newCat);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al añadir la categoria" });
  }
};

module.exports = {
  getAllCategories,
  postCategory,
};
