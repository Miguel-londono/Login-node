const { Router } = require("express");
const {validations} = require("../middlewares/validations")
const { check } = require('express-validator');
const {login} = require('../controller/auth')

const router = Router();

router.post('/login',[
    check('email', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validations
], login)

module.exports = router