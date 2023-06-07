const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { MongoClient } = require("mongodb");

let mongodb;

exports.connectDBTest = async () => {
  mongoose.set("strictQuery", false);
  try {
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log("MONGO TEST", uri);
    await mongoose.connect(uri);

    // añadir datos a la BD
  } catch (e) {
    console.log(e);
  }
};

exports.disconnectDBTest = async () => {
  try {
    await mongoose.connection.close();
    if (mongodb) {
      await mongodb.stop();
      console.log("ADEU");
    }
  } catch (err) {
    console.log(err);
  }
};
