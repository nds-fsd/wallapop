const dotenv = require("dotenv");
const http = require("http");
const {Server} = require("socket.io");
const  configurePrivateSocket = require("./socket");




// Importo el app para conectar la BD i despues levanto el servidor
// lo separo en dos archivos para poder levantar la BD y hacer los test
// sin tener que levantar el server
const app = require("./app");
// const { configurePrivateSocket } = require("./socket");
const server = http.createServer(app)
const io = new Server(server)



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is up and running ⚡ ${PORT}`);
});

exports.ioPrivate = configurePrivateSocket(io);
