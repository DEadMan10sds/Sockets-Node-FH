const express = require("express");
const cors = require("cors");

//const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = require("http").createServer(this.app);
    this.io = require("socket.io")(this.server);

    this.paths = {};

    // Conectar a base de datos
    //this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    this.sockets();
  }

  async conectarDB() {
    //await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio Público
    this.app.use(express.static("public"));
  }

  routes() {}

  sockets() {
    this.io.on("connection", (socket) => {
      socket.on("send-message", (payload, callback) => {
        payload.origin = "Server";
        this.io.emit("send-message", payload);
        callback("Listo");
      });

      socket.on("disconnect", () => {
        console.log("Cliente desconectado");
      });
    });
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
