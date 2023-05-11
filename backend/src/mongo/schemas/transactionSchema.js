const { Schema } = require("mongoose");

// creamos el esquema de la entidad
const transactionSchema = new Schema({
  date: { type: Date, required: true },
  state: { type: Boolean },
  address: { type: String, required: true },

  // Para poder relacionar transacion con usuario comprador
  purchaser: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  ],
  // Para poder relacionar transacion con usuario vendedor
  vendor: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  ],
  // Para poder relacionar transacion con usuario productos
  product: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "product",
    },
  ],
  amount: { type: String },
});

module.exports = transactionSchema;
