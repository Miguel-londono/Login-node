const { response, request } = require("express");
const bcryptjs = require('bcryptjs')
const User = require('../models/user')

const usersGet = async(req = request, res = response) => {

  //const {q,nombre} = req.query
  const {limit = 5, from = 0} = req.query

  //const users = await User.find({estado : true}).skip(from).limit(limit)
  //const total = await User.countDocuments({estado:true})

  const [total, users] = await Promise.all([
    User.countDocuments({estado:true}),
    User.find({estado : true}).skip(Number(from)).limit(Number(limit))
  ])
  res.json({
    total,
    users
  });
};


const createUser = async (req, res = response) => {


  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });
  
  //Verificar si el correo existe
  
  //Encriptar la contraseña 

  const salt = bcryptjs.genSaltSync()
  user.password = bcryptjs.hashSync(password,salt)

  //Guardar en base de datos 
  await user.save()


  res.json({
    msg: 'post API - Usuario creado',
    user
  });
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const {password, google, ...resto} = req.body

  //Validacion contra base de datos 

  if(password) {
    //Encriptar contraseña 
    const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync(password,salt)
  }

  const user = await User.findByIdAndUpdate(id, resto)

  user.save()

  res.json({
    ok: true,
    msg: "put API - usuarios PUT",
    user
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params
  const uid = req.uid



  //Fisicamente lo borramos 
  //const user = await User.findByIdAndDelete(id)

  //Borramos con el estado para no perder informacion 

  const user = await User.findByIdAndUpdate(id, {estado:false})

  res.json({
    uid,
    user
  });
};

module.exports = {
  usersGet,
  createUser,
  updateUser,
  deleteUser,
};
