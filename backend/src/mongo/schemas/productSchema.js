const { Schema } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: String },
  status: { type: String },
  keywords: { type: Array },
  datePublication: {type: Date},
  categories: [{
    type: Schema.Types.ObjectId,
    ref: "category",
  }],
  characteristics: {
    rent : { type: String },
    space : { type: String },
    land : { type: Number },
    brand : { type: String },
    model : { type: String },
    year : { type: Number },
    doors : { type: String },
    seats : { type: String },
    km : { type: String },
    engine : { type: String },
    shift : { type: String }
  }
});

module.exports = productSchema;
