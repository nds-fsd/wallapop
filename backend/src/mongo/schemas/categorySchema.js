const { Schema } = require("mongoose");

// creamos el esquema de la entidad
const categorySchema = new Schema({
  id: { type: Number },
  title: { type: String, required: true },
  logo: { type: String },
  path: { type: String },
});

module.exports = categorySchema;
