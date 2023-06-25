const { configurePrivateSocket } = require("./socket");
const app = require("./app");

const dotenv = require("dotenv");

// Importo el app para conectar la BD i despues levanto el servidor
// lo separo en dos archivos para poder levantar la BD y hacer los test
// sin tener que levantar el server

// const { configurePrivateSocket } = require("./socket");

console.log("PORT", process.env.PORT);
const PORT = process.env.PORT || 3001;
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");

const server = app.listen(PORT, () => {
  console.log("bbbbbbbbbbbbbbbbbbbbbbbbbb");

  console.log(`Server is up and running ⚡ ${PORT}`);
});
console.log("ccccccccccccccccccccc");

exports.ioPrivate = configurePrivateSocket(server);
