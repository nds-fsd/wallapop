const { Schema } = require("mongoose");

// creamos el esquema de la entidad
// Para poder relacionar favoritos con productos

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: "product",
  }],
});

module.exports = favoriteSchema;
