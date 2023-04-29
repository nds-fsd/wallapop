
const express = require('express');
const {connectDB} =  require("./mongo/connection");
const cors = require('cors');
const productRouter = require('./mongo/routers/productRouter')
const userRouter = require("./mongo/routers/userRouter");
const categoryRouter = require("./mongo/routers/categoryRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use('/products', productRouter);

app.use("/category", categoryRouter);

connectDB().then(() => console.log("Connected to database!"))

const server = app.listen(3001, () => {
  console.log("Server is up and running ⚡");
});
