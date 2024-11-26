const { Router } = require("express");
const { check } = require('express-validator');
const {validations} = require("../middlewares/validations")

const router = Router();

/**{{url}}/api/categories */

router.get('/', (res, res) => {
    console.log('Todo ok')
})
module.exports = router