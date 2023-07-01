const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getProducts)

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createProduct
);
router.put(
    '/:id',
    updateProduct
);
router.delete(
    '/:id',
    deleteProduct
);


module.exports = router;