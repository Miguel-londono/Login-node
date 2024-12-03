const { Router } = require("express");
const { getProducts,
    getProduct,
    createProducts,
    updateProducts,
    deleteProducts } = require("../controller/product");
const { validarJWT, validations } = require("../middlewares");
const { check } = require("express-validator");



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
    validations
], createProducts);

//Actualizar Producto

router.put("/id", [], updateProducts);

//Borrar Producto

router.delete("/id", [], deleteProducts);


module.exports = router