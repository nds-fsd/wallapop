const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find().populate("categories").exec();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json({ message: "Can't find products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const productById = await productModel
      .findById(id)
      .populate("user")
      .populate("categories")
      .exec();
    res.status(200).json(productById);
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this product" });
  }
};

const getProductByUser = async (req, res) => {
  // console.log("paso por aqui");
  const userId = req.params.user;
  try {
    if (!userId) res.status(404).json("no user id provided");
    if (userId) {
      const product = await productModel
        .find({ user: userId })
        .populate("user")
        .populate("categories");
      res.status(200).json(product);
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

// Buscar productos por categorias
const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const productByCategory = await productModel
      //buscamos por el nombre de la categoria que la obtenemos de la url
      .find({ category })
      //y populamos con categorias para buscar los productos que tiene esa categoria
      .populate("categories");
    res.status(200).json(productByCategory);
    console.log(productByCategory);
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this category" });
    console.log(error);
  }
};

// Buscar productos por name
const getProductByName = async (req, res) => {
  const { name } = req.params;
  try {
    const productByName = await productModel.find({
      title: { $regex: new RegExp(name, "i") },
    });
    res.status(200).json(productByName);
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this category" });
    console.log(error);
  }
};

// Crear producto
const postProduct = async (req, res) => {
  const { body } = req;
  const { user } = req.params;
  try {
    const newProduct = new productModel(body);
    newProduct.user = user;
    const cat = await categoryModel.findOne({ title: newProduct.category });
    if (cat) {
      newProduct.categories.push(cat._id);
    }
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const updateProduct = await productModel
      .findByIdAndUpdate(id, body, { new: true })
      .exec();
    if (!updateProduct) {
      return res.status(404).json({ error: "Sorry, can't find this product" });
    }
    res.status(201).json(updateProduct);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the product" });
  }
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const delProduct = await productModel.findByIdAndDelete(id).exec();
    if (!delProduct) {
      return res.status(404).json({ error: "Sorry, can't find this product" });
    }
    res.status(200).json({
      delProduct,
      message: "Your product has been successfully deleted",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByUser,
  getProductByCategory,
  postProduct,
  updateProductById,
  deleteProductById,
  getProductByName,
};
