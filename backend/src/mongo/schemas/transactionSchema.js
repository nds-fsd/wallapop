const { Schema } = require("mongoose");

// creamos el esquema de la entidad
const transactionSchema = new Schema({
  date: { type: Date, required: true },
  state: { type: Boolean },
  address: { type: String, required: true },
  purchaser: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  ],
  vendor: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  ],
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
