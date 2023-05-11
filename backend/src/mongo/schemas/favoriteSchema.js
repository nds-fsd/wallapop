const { Schema } = require("mongoose");

// creamos el esquema de la entidad
const favoriteSchema = new Schema({
  // Para poder relacionar favoritos con productos
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

module.exports = favoriteSchema;