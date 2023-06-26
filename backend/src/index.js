require("express");

// Importo el app para conectar la BD i despues levanto el servidor
// lo separo en dos archivos para poder levantar la BD y hacer los test
// sin tener que levantar el server

// const { configurePrivateSocket } = require("./socket");
const m = require("./app");
const { configurePrivateSocket } = require("./socket");

console.log("PORT", process.env.PORT);
const port = process.env.PORT || 3001;
console.log("APP", m);

const server = m.app.listen(port, () => {
  console.log(`Server is up and running ⚡ ${port}`);
});

exports.ioPrivate = configurePrivateSocket(server);
