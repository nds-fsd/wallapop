const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  title: { type: String, required: true },
  logo: { type: File },
});

const Category = model("product", categorySchema);

module.exports = Category;
