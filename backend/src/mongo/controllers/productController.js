const productModel = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find().exec();
    res.status(201).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Can't find products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productById = await productModel.findById(id).exec();
    res.status(200).json(productById);
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this product" });
  }
};

const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  console.log(category);
  try {
    const productByCategory = await productModel.find({ category }).exec();
    res.status(200).json(productByCategory);
    console.log(productByCategory);
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this category" });
    console.log(error);
  }
};


const postProduct = async (req, res) => {
  const newProduct = new productModel(req.body);
  try {
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Can't post this product" });
    console.log(error);
  }
};

const updateProductById = async (req, res) => {
  try {
    const updateProduct = await productModel
      .findByIdAndUpdate(req.params.id, req.body)
      .exec();
    res
      .status(204)
      .json({
        updateProduct,
        message: "Your product has been successfully updated",
      });
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this product" });
  }
};

const updateProductByTitle = async (req, res) => {
  const filter = { title: req.params.title };
  try {
    const updateProd = await productModel
      .findOneAndUpdate(filter, req.body)
      .exec();
    res
      .status(204)
      .json({
        updateProd,
        message: "Your product has been successfully updated",
      });
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const delProduct = await productModel
      .findByIdAndDelete(req.params.id)
      .exec();
    res
      .status(204)
      .json({
        delProduct,
        message: "Your product has been successfully deleted",
      });
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByCategory,
  postProduct,
  updateProductById,
  updateProductByTitle,
  deleteProduct,
};
