const { Schema } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String },
  status: { type: String },
  keywords: { type: String }
});

module.exports = productSchema;
