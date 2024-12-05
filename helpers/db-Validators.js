const Rol = require("../models/rol");
const User = require('../models/user')
const Product = require("../models/product");
const Categorie = require("../models/categorie");

const isRolValid = async (rol = "") => {
  const existsRol = await Rol.findOne({ rol });
  if (!existsRol)
    throw new Error(`EL rol ${rol} no esta registado en la base de datos`);
};

const isEmail = async (email = "") => {
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw new Error(`EL email: ${email} ya esta registrado`);
  }
};

const isUserId = async (id = "") => {
  const existsId = await User.findById(id);
  if (!existsId) {
    throw new Error(`EL id: ${id} no existe`);
  }
};

const isProduct = async (id = "") => {
  const existsProduct = await Product.findById(id);
  if (!existsProduct) {
    throw new Error(`EL id: ${id} del producto no existe`);
  }
};

const isCategorieDb = async (name = "") => {
  const existsCategorie = await Categorie.findOne({name});
  if (!existsCategorie) {
    throw new Error(`La categoria: ${name} no existe`);
  }
};


module.exports = {
  isRolValid,
  isEmail,
  isUserId,
  isCategorieDb,
  isProduct
}
