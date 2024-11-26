

const isAdmin = (req, res, next)=>{
    if(!req.user){
        return res.status(500).json({
            msg: 'Se quiere verificar el token sin validar primero'
        })
    }


    const {rol, name} = req.user

    if(rol !== 'ADMIN_ROL'){
        return res.status(401).json({
            msg: `${name} no es administrador - No puede hacer esto`
        })
    }

    next()
}

const hasRole = (...rols) =>{

    return (req, res, next) =>{
        if(!req.user){
            return res.status(500).json({
                msg: 'Se quiere verificar el token sin validar primero'
            })
        }
        if (!rols.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: "Tu rol no esta autorizado"
            })
        }
        next()
    }
}

module.exports = {
    isAdmin,
    hasRole
}