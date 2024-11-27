const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs')
const {generarJWT} = require('../helpers/jwtGenerator')
const googleVerify = require('../helpers/google-verify')


const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el Email existe

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - correo" });
    }

    //Verificar si esta activo

    if (!user.estado) {
      return res
        .status(400)
        .json({ msg: "Usuario / Password no son correctos - estado:false " });
    }

    //Verificar Contraseña

    const validPassword = bcryptjs.compareSync(password, user.password)

    if (!validPassword) {
        return res
          .status(400)
          .json({ msg: "Usuario / Password no son correctos - Contraseña errada " });
      }

    //General el JWT

    const token = await generarJWT(user.id)

    res.json({
        user,
        token
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal hablar con el admin",
    });
  }

};

const googleSingIn = async (req,res) => {

  const {id_token} = req.body;

  try {
    
    const {name, img, email} = await googleVerify(id_token)

    // Mirar si el correo ya esta en la base de datos 

    let user = await User.findOne({email});

    if (!user){
      // Tenemos que crearlo 

      const data = {
        name,
        email,
        password: ':]',
        img,
        google:true,
      }
      user = new User(data);
      await user.save()
    }

    //Si el usuario en BD esta en false
    if(!user.estado){
      return res.estatus(401).json({
        msg:'El usuario esta bloqueado Hablar con el admin',
      })
  
    }

    // ahora generamos el JWT 

    const token = await generarJWT(user.id)

    res.json({
      token,
      user
    })

  } catch (error) {
    console.log(error)
    res.status(400).json({
      msg: 'Token de Google no es valido'
    })
    
  }

}

module.exports = {
  login,
  googleSingIn
};
