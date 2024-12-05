const { request } = require("express");
const Product = require("../models/product");
const Categorie = require("../models/categorie");



const getProducts = async (req, res) => {
  const { from, limit } = req.query;

  const [total, products] = await Promise.all([
    Product.countDocuments({ state: true }),
    Product.find({ state: true })
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "name")
      .populate("categorie", "name")
      .exec()
  ]);

  res.json({
    total,
    products,
  });
  res.json("Obtener Productos");
};


const getProduct = async(req, res) => {
    const {id} = req.params
    
    //Consultar el id
    const product = await Product.findById(id);
    
    res.json(product);
};



const createProducts = async (req, res) => {
  const name = req.body.name.toUpperCase();
  //Verificar si el producto ya existe en la base de datos

  const productDB = await Product.findOne({ name });
  if (productDB) {
    return res.status(400).json({
      msg: "El Producto ya existe en la base de datos",
    });
  }

  //Verificar si la categoria existe
  const categorie = req.body.categorie.toUpperCase();
  const categorieDB = await Categorie.findOne({ name: categorie });
  if (categorieDB) {
    //Generar la data que vamos a guardar
    const data = {
      name,
      user: req.user._id,
      categorie: categorieDB._id,
    };

    //Crear producto
    const createProduct = await new Product(data);
    createProduct.save();
    return res.status(201).json(data);
  } else res.status(400).json("La Categoria no existe");
};


const updateProducts = async (req, res) => {
    const {id} = req.params
    const {name, categorie} = req.body

    //Creando data para actualizar el Producto

    const data = {
        name,
        user: req.user._id
    }
    
    
//Actualizando en la base de datos

  const updateProduct = await Product.findByIdAndUpdate(id, data)
  updateCategorie.save()

  res.json({updateProduct});


};


const deleteProducts = async (req, res) => {

  const { id } = req.params

    //Borramos el Estado del la cateogria 

    const deleteProduct = await Product.findByIdAndUpdate(id, {state:false} , {new:true} )

    res.json(
        {
          deleteProduct
        }
    )


  res.json("Obtener Productos");


};

module.exports = {
  getProducts,
  getProduct,
  createProducts,
  updateProducts,
  deleteProducts,
};
