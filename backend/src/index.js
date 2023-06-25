const { configurePrivateSocket } = require("./socket");
const express = require("express");

const app = require("./app");

const app2 = express();

// Importo el app para conectar la BD i despues levanto el servidor
// lo separo en dos archivos para poder levantar la BD y hacer los test
// sin tener que levantar el server

// const { configurePrivateSocket } = require("./socket");

console.log("PORT", process.env.PORT);
const port = process.env.PORT || 3001;
console.log("PORT 2", port);

const server = app2.listen(port, () => {
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbb");

  console.log(`Server is up and running ⚡ ${port}`);
});
console.log("ccccccccccccccccccccc");

exports.ioPrivate = configurePrivateSocket(server);
