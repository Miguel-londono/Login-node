const { Router } = require("express");
const { getProducts,
    getProduct,
    createProducts,
    updateProducts,
    deleteProducts } = require("../controller/product");
const { validarJWT, validations } = require("../middlewares");
const { check } = require("express-validator");
const { isProduct, isCategorieDb } = require("../helpers/db-Validators");
const { isCategorie } = require("../middlewares/validateCategorie");



const router = Router();

//Obtener Productos

router.get("/", [], getProducts);

// Obtener Producto

router.get("/:id", [
    validarJWT,
    check('id', 'No es un id valido de mongo').isMongoId(),
    validations
], getProduct);

//Crear producto 

router.post("/", [
    validarJWT,
    check('name', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('id').custom((id) => isProduct(id)),
    validations
], createProducts);

//Actualizar Producto

router.put("/:id", [
    validarJWT,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom((id) => isProduct(id)),
    check('categorie').custom((name) => isCategorie(name)),
    validations,
], updateProducts);

//Borrar Producto

router.delete("/:id", [
    validarJWT,
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom((id) => isProduct(id)),
    validations
], deleteProducts);


module.exports = router