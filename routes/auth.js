const { Router } = require("express");
const {validations} = require("../middlewares/validations")
const { check } = require('express-validator');
const {login, googleSingIn} = require('../controller/auth')

const router = Router();

router.post('/login',[
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validations
], login)

router.post('/google',[
    check('id_token', 'El token es necesario').not().isEmpty(),
    validations
], googleSingIn)



module.exports = router