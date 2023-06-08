const express = require("express");
const { connectDB } = require("./mongo/connection");
const cors = require("cors");
const productRouter = require("./mongo/routers/productRouter");
const userRouter = require("./mongo/routers/userRouter");
const categoryRouter = require("./mongo/routers/categoryRouter");
const messageRouter = require("./mongo/routers/messageRouter");
const jwtMiddleware = require("./security/jwtMiddleware");
const chatroomRouter = require("./mongo/routers/chatroomRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/message",jwtMiddleware, messageRouter)
app.use("/chat-room",jwtMiddleware, chatroomRouter)
app.use("/category", categoryRouter);

connectDB().then(() => console.log("Connected to database!"));

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is up and running ⚡ ${PORT}`);
});
