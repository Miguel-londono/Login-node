const { Router } = require("express");
const { check } = require('express-validator');
const {validations} = require("../middlewares/validations");
const { createCategorie, getCategories } = require("../controller/categorie");
const { validarJWT } = require("../middlewares");
const { getCategorie } = require("../controller/categorie");
const { deleteCategorie } = require("../controller/categorie");
const { updateCategorie } = require("../controller/categorie");
const { isCategorie } = require("../middlewares/validateCategorie");




const router = Router();

/**{{url}}/api/categories */


//Obtener todas las categorias -- publico
router.get('/', [

], getCategories)

//Obtener una categoria por Id
router.get('/:id',[
    check('id', 'No es un Id de mongo valido').isMongoId(),
    isCategorie,
    validations
], getCategorie)

//Crear categoria - Privado - Cualquier persona con un token Valido
router.post('/', [
    validarJWT,
    check('name', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validations
], createCategorie)


//Actulizar - Privado - Cualquier persona con un token Valido 
router.put('/:id', [
    validarJWT,
    check('id', 'No es un Id de mongo valido').isMongoId(),
    isCategorie,
    validations
], updateCategorie)

//Delete categoria - Privado - Cualquier persona con un token Valido
router.delete('/:id', [
    validarJWT,
    check('id', 'No es un Id de mongo valido').isMongoId(),
    isCategorie,
    validations
], deleteCategorie)



module.exports = router