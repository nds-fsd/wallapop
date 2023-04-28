const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String },
  status: { type: String },
});

const Product = model("product", productSchema);

module.exports = Product;
