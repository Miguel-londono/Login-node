const jwt = require('jsonwebtoken')
const {response, request} = require('express')
const User = require('../models/user')


const validarJWT = async (req= request, res=response, next)=>{

    const token = req.header('x-token');
    
    if (!token) {
        return res.status(400).json({
            msg: 'No hay token'
        })
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

        // leer el usuario que corresponde al uid 
        const user = await User.findById(uid);

        if (!user){
            return res.status(401).json({
                msg:'Token no valido - Usuario no Existe en BD'
            })
        }

        //Verificamos el estado del usuario 

        if (!user.estado){
            return res.status(401).json({
                msg:'Token no valido - Usuario con estado false'
            })
        }

        req.user = user

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msj: 'Token no valido'
        })
    }
}

module.exports = {
    validarJWT
}