const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const productRouter = require("./mongo/routers/productRouter");
const userRouter = require("./mongo/routers/userRouter");
const categoryRouter = require("./mongo/routers/categoryRouter");
const favoriteRouter = require("./mongo/routers/favoriteRouter");
const { connectDB } = require("./mongo/connection");
const transactionRouter = require("./mongo/routers/transactionRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/favorites", favoriteRouter)
app.use("/transactions", transactionRouter);

if (process.env.MONGO_URL) {
  connectDB().then(() => console.log("Connected to database!"));
}

// const PORT = process.env.PORT || 3001;
// const server = app.listen(PORT, () => {
//   console.log(`Server is up and running ⚡ ${PORT}`);
// });

module.exports = app;
