const { Schema } = require("mongoose");

// creamos el esquema de la entidad
// Para poder relacionar favoritos con productos

const favoriteSchema = new Schema({
  favorite: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: "product",
  },]
});

module.exports = favoriteSchema;
