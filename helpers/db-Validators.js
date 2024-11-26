const Rol = require("../models/rol");
const User = require('../models/user')

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



module.exports = {
  isRolValid,
  isEmail,
  isUserId
};
