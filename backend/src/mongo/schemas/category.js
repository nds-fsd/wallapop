const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  id: { type: Number },
  title: { type: String, required: true },
  // logo: { type: File },
  logo: { type: String },
});

const Category = model("product", categorySchema);

module.exports = Category;
