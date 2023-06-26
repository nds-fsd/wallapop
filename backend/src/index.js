const dotenv = require("dotenv");
dotenv.config();

// Importo el app para conectar la BD i despues levanto el servidor
// lo separo en dos archivos para poder levantar la BD y hacer los test
// sin tener que levantar la BD de prod

const app = require("./app");

console.log("PORT", process.env.PORT);
const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log(`Server is up and running ⚡ ${port}`);
});
const { configurePrivateSocket } = require("./socket");
exports.ioPrivate = configurePrivateSocket(server);
