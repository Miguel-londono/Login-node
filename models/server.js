const express = require("express");
const cors = require("cors");
const {dbConnection} = require('../database/config')

const {} = require('../database/config')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.path = {
      auth: '/api/auth',
      user: '/api/users"',
      categories: '/api/categories'
    }

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
    this.app.use(this.path.user, require("../routes/user"));
    this.app.use(this.path.auth, require("../routes/auth"));
    this.app.use(this.path.categories, require("../routes/categorie"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
