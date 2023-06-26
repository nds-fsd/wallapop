const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const productRouter = require("./mongo/routers/productRouter");
const userRouter = require("./mongo/routers/userRouter");
const categoryRouter = require("./mongo/routers/categoryRouter");
const favoriteRouter = require("./mongo/routers/favoriteRouter");
const { connectDB } = require("./mongo/connection");
const messageRouter = require("./mongo/routers/messageRouter");
const { jwtMiddleware } = require("./security/jwtMiddleware");
const chatroomRouter = require("./mongo/routers/chatroomRouter");
const transactionRouter = require("./mongo/routers/transactionRouter");

const app = express();
console.log("aa", app);
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/category", categoryRouter);
app.use("/favorites", favoriteRouter);
app.use("/message", jwtMiddleware, messageRouter);
app.use("/chat-room", jwtMiddleware, chatroomRouter);
app.use("/transactions", transactionRouter);

if (process.env.MONGO_URL) {
  connectDB().then(() => console.log("Connected to database!"));
}

module.exports = { app };
