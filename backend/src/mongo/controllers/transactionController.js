const productModel = require("../models/productModel");
const transactionModel = require("../models/transactionModel");
const userModel = require("../models/userModel");

// Definimos el CRUD todas las funciones para poder llamarlas en el Router
const getTransactionsById = async (req, res) => {
  const { id } = req.params;
  try {
    const transactionById = await transactionModel
      .findById(id)
      .populate("purchaser")
      .populate("vendor")
      .populate("product")
      .exec();
    res.status(200).json(transactionById);
  } catch (error) {
    res.status(404).json({ error: "Sorry, can't find this transaction" });
  }
};

const getTransactionsByUser = async (req, res) => {
  //   console.log("paso por aqui");
  const userId = req.params.user;
  //   console.log("y luego por aqui con el uderID", userId);
  try {
    if (!userId) res.status(404).json("no user id provided");
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
      console.log("newtransaction", newtransaction);
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
