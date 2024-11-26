const express = require("express");
const cors = require("cors");
const {dbConnection} = require('../database/config')

const {} = require('../database/config')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";

    //Conectar a base de datos 

    this.conectarDB()

    // Middlewares

    this.middlewares();

    // Rutas de mi aplicacion
    this.routes();
  }

  async conectarDB(){
    await dbConnection()
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    // Parseo y lectura del body
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user"));
    this.app.use(this.authPath, require("../routes/auth"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
