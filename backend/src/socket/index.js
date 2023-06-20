const { jwtVerifier } = require("../security/jwtMiddleware");
const socketio = require("socket.io");

const configurePrivateSocket = (server) => {
  const io = socketio(server, {
    cors: {
      origin: "*",
    },
    path: "/private",
  });

  io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
      jwtVerifier(socket.handshake.auth.token, (err, user) => {
        if (err) return next(new Error("Authentication error"));
        socket.user = user;
        console.log(`User: ${user}`);
        next();
      });
    } else {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (client) => {
    console.log("Frontend is connected!");
  });

  io.on("disconnect", (socket) => {
    console.log(`User ${socket.user.name} has disconnected`);
  });

  return io;
};

module.exports = { configurePrivateSocket };
