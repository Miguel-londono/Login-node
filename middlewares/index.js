const validations = require("../middlewares/validations")
const validarJWT = require('../middlewares/validar-jwt')
const ValidaRols = require("../middlewares/hasRole")


module.exports = {
    ...validations,
    ...validarJWT,
    ...ValidaRols
}