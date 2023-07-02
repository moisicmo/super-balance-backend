const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const {
    getKardexProducts,
    createKardexProduct,
} = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getKardexProducts)

router.post(
    '/',
    [
        check('detail', 'La cantidad es obligatoria').not().isEmpty(),
        validarCampos
    ],
    createKardexProduct
);


module.exports = router;