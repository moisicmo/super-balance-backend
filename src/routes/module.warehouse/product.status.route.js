const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const { productStatusExists } = require('./../../helpers');
const {
    getProductStatus,
    createProductStatus,
    updateProductStatus,
    deleteProductStatus,
} = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getProductStatus)

router.post(
    '/',
    [
        check('productId', 'El nombre es obligatorio').not().isEmpty(),
        check('priceId', 'El nombre es obligatorio').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(productStatusExists),
        validarCampos
    ],
    createProductStatus
);
router.put(
    '/:id',
    [
        check('productId', 'El nombre es obligatorio').not().isEmpty(),
        check('priceId', 'El nombre es obligatorio').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(productStatusExists),
        validarCampos
    ],
    updateProductStatus
);
router.delete(
    '/:id',
    deleteProductStatus
);


module.exports = router;