const productModel = require("../models/productModel");
const transactionModel = require("../models/transactionModel");
const userModel = require("../models/userModel");

// Definimos el CRUD todas las funciones para poder llamarlas en el Router

const getTransactionsByUser = async (req, res) => {
  const userId = req.params.user;

  if (!userId) res.status(404).json("no user id provided");
  try {
    if (userId) {
      const transaction = await transactionModel
        //   buscamos la transacion con el id del comprador y nos devolvera una lista con todas las transaciones
        .find({ purchaser: userId })
        .populate("purchaser")
        .populate("vendor")
        .populate("product");
      res.status(200).json(transaction);
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

// Crear transactiono
const postTransactions = async (req, res) => {
  const { body } = req;
  const { product: idProduct } = req.body;
  const { idPurchaser } = req.params;

  if (!idPurchaser || !body.address) {
    return res.status(400).json({ error: { login: "Missing information" } });
  } else {
    try {
      // Le añadimos los datos que vienen del body para crear la transacion
      const newtransaction = new transactionModel(body);
      // le añadimos el idPurchaser que viene en el params
      newtransaction.purchaser.push(idPurchaser);
      // buscamos con el id del product toda su informacion
      const productInfo = await productModel
        .findById(idProduct)
        .populate("user")
        .exec();
      //y le añadimos a la transacion el id del user propietario del producto
      newtransaction.vendor.push(productInfo.user._id);
      await newtransaction.save();

      res.status(201).json(newtransaction);
    } catch (error) {
      res.status(500).json({ error: "Sorry, can't post this transaction" });
    }
  }
};

module.exports = {
  getTransactionsByUser,
  postTransactions,
};
