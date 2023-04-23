const {model} = require('mongoose')
const productSchema = require("../schemas/productSchema");

const productModel = model("product", productSchema);

module.exports = productModel;