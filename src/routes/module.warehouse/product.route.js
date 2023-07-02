const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const { productExists } = require('./../../helpers');
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
        check('categoryId', 'La categoria es obligatoria').not().isEmpty(),
        check('unitMeasurementId', 'La unidad de medida es obligatoria').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(productExists),
        validarCampos
    ],
    createProduct
);
router.put(
    '/:id',
    [
        check('categoryId', 'La categoria es obligatoria').not().isEmpty(),
        check('unitMeasurementId', 'La unidad de medida es obligatoria').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(productExists),
        validarCampos
    ],
    updateProduct
);
router.delete(
    '/:id',
    deleteProduct
);


module.exports = router;