const { Schema } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String },
  status: { type: String },
  keywords: { type: Array },
  datePublication: { type: Date },
  category: { type: String },
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  rent: { type: String },
  space: { type: String },
  land: { type: Number },
  brand: { type: String },
  model: { type: String },
  year: { type: Number },
  doors: { type: Number },
  seats: { type: Number },
  km: { type: Number },
  engine: { type: String },
  shift: { type: String },
});

module.exports = productSchema;
