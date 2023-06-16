const dotenv = require("dotenv");

// Importo el app para conectar la BD i despues levanto el servidor
// lo separo en dos archivos para poder levantar la BD y hacer los test
// sin tener que levantar el server
const app = require("./app");
// const { configurePrivateSocket } = require("./socket");



const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is up and running ⚡ ${PORT}`);
});

// exports.ioPrivate = configurePrivateSocket(server);