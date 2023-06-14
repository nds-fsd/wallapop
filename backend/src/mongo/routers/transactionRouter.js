const express = require("express");
const {
  getTransactionsByUser,
  postTransactions,
} = require("../controllers/transactionController");

const transactionRouter = express.Router();

// definimos la ruta y la funcion que va a utilizar de controller
transactionRouter.get("/getbyuser/:user", getTransactionsByUser);
transactionRouter.post("/newTransaction/:idPurchaser", postTransactions);

module.exports = transactionRouter;
