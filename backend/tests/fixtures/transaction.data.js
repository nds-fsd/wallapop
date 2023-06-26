const transactionModel = require("../../src/mongo/models/transactionModel");

const transactions = [
  {
    _id: "649335971252e4732fc9d7b8",
    date: "2023-06-21T17:38:28.404+00:00",
    address: "calle padilla 1",
    purchaser: "648e04f769eda0696e70ba6a",
    vendor: "6479d339af04b142dc126e8f",
    product: "648883d985809e9a41b9d175",
  },
  {
    _id: "64947d1510369cd577c2335e",
    date: "2023-06-22T16:55:45.705+00:00",
    address: "Ayacucho 1557",
    purchaser: "6460c2f2980f4e977122dc3c",
    vendor: "6460c2f2980f4e977122dc3c",
    product: "6481dd1260f5f3f455be0b32",
  },
  {
    _id: "6496df91a3597329ee5f78ed",
    date: "2023-06-24T12:20:33.142+00:00",
    address: "Los Fortines 724",
    purchaser: "6496c835a3597329ee5f7348",
    vendor: "6479d339af04b142dc126e8f",
    product: "64888a6a85809e9a41b9d276",
  },
];

exports.loadTransaction = () => {
  const documents = transactions.map(
    (transaction) => new transactionModel(transaction)
  );
  return transactionModel.bulkSave(documents);
};
