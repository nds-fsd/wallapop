const express = require("express");
cors = require("cors");
// const { myMiddleware, comprovacionDatos } = require("./middleware");
const app = express();
const categoriesRouter = require("./category/index");
const mongo = require("./mongo");

app.use(cors());

//Le decimos a nuestra app, que vamos recibir peticiones donde el Body contiene texto en formato JSON.
app.use(express.json());

// app.use(myMiddleware);

//Le decimos a nuestra app, que "utilize" el router de todos. Esto es equivalente a haber definido todos nuestros endpoints directamente sobre el objeto app como vimos en clase.
app.use(categoriesRouter);

//a partir de este punto y gracias a la linea escrita mas arriba, si llega alguna peticion que empieze por /todo, está se redirige hacia todoRouter.

app.listen(3005, () => {
  console.log("Server is up and running in port 3005");
});
