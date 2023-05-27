const { model } = require("mongoose");
const favoriteSchema = require("../schemas/favoriteSchema");

// creamos el modelo de la entidad
const favoriteModel = model("favorite", favoriteSchema);

module.exports = favoriteModel;
