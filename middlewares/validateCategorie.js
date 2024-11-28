const Categorie = require('../models/categorie')






const isCategorie = async (req, res , next ) =>{



    const id = req.params.id

    const existsCategorie = await Categorie.findById(id)
    if(!existsCategorie){
      throw new Error(`La categoriaa ${id} no eiste en la BD`)
    }

    // Retorna la categoria

    req.categorie = existsCategorie

    next()

  }

  module.exports = {
    isCategorie
  }
  