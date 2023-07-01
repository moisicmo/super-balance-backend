const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
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
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createProductStatus
);
router.put(
    '/:id',
    updateProductStatus
);
router.delete(
    '/:id',
    deleteProductStatus
);


module.exports = router;