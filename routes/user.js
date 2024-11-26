const { Router } = require("express");
const { check } = require('express-validator');
const {validations} = require("../middlewares/validations")
const {isRolValid, isEmail, isUserId} = require("../helpers/db-Validators")
const {validarJWT} = require('../middlewares/validar-jwt')

const {
  usersGet,
  createUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

const router = Router();

router.get("/", usersGet);

router.put("/:id",[
  check('id', 'No es un Id válido').isMongoId(),
  check('id').custom((id) => isUserId(id)),
  check('rol').custom((rol)=> isRolValid (rol)),
  validations
],updateUser);

router.post('/',[
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
  check('email', 'El correo no es válido').isEmail().custom((email)=> isEmail (email)),
  // check('rol' ,'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('rol').custom((rol)=> isRolValid (rol)),
  validations
], createUser );

router.delete("/:id",[
  validarJWT,
  check('id', 'No es un Id válido').isMongoId(),
  check('id').custom((id) => isUserId(id)),
  validations
], deleteUser);

module.exports = router;
