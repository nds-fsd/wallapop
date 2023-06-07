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

const getProductByUserFavs = async (req, res) => {
  // console.log("paso por aqui");
  const userId = req.params.user;
  try {
    if (!userId) res.status(404).json("no user id provided");
    if (userId) {
      const product = await productModel
        .find({ user: userId, favorite: true })
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
    const uploadedImages = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      uploadedImages.push(result.secure_url);
    }

    newProduct.images = uploadedImages;
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Sorry, can't post this product" });
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
  getProductByUserFavs,
};




// const newProduct = new productModel(req.body);
  // //cogemos el los datos del ususario que hemos pasado por la url de la peticion
  // const userId = req.params.userId;
  // //parseamos los datos y cogemos el id del usuario y lo añadimos al newProduct
  // newProduct.user.push(JSON.parse(userId).id);

  // //hacemos una findOne con el nombre de la categoria para poder obtener toda su info y coger el id para ponerselo al producto
  // // y asi relacionarlo con categoria
  // const cat = await categoryModel.findOne({ title: req.body.category });
  // // le añadimos el id de la categoria encontrado arriba al producto antes de crearlo
  // newProduct.categories.push(cat._id);
  // try {
  //   await newProduct.save();
  //   // console.log(newProduct);
  //   res.status(200).json(newProduct);
  // } catch (error) {
  //   res.status(500).json({ error: "Can't post this product" });
  //   console.log(error);
  // }
