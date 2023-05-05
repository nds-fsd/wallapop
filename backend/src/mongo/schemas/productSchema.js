const { Schema } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String },
  status: { type: String },
  keywords: { type: String },
  datePublication: {type: Date},
  categories: [{
    type: Schema.Types.ObjectId,
    ref: "category",
  }],
});

module.exports = productSchema;
