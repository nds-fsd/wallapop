const dotenv = require("dotenv");
// dotenv.config();
// const express = require("express");
// const cors = require("cors");
// const productRouter = require("./mongo/routers/productRouter");
// const userRouter = require("./mongo/routers/userRouter");
// const categoryRouter = require("./mongo/routers/categoryRouter");
// const { connectDB } = require("./mongo/connection");
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use("/user", userRouter);
// app.use("/products", productRouter);
// app.use("/category", categoryRouter);
// connectDB().then(() => console.log("Connected to database!"));

// Importo el app para conectar la BD i despues levanto el servidor
// lo separo en dos archivos para poder levantar la BD y hacer los test
// sin tener que levantar el server
const app = require("./app");

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is up and running ⚡ ${PORT}`);
});
