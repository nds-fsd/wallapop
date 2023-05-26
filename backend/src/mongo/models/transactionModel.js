const { model } = require("mongoose");
const transactionSchema = require("../schemas/transactionSchema");

// creamos el modelo de la entidad
const transactionModel = model("transaction", transactionSchema);

module.exports = transactionModel;
