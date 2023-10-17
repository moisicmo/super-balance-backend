const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const {
    getInputs,
    createInput,
} = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getInputs)

router.post(
    '/',
    [
        check('productStatusId', 'El estado del producto es obligatorio').not().isEmpty(),
        check('warehouseId', 'La sucursal es obligatorio').not().isEmpty(),
        check('detail', 'El detalle es obligatorio').not().isEmpty(),
        check('quantity', 'La cantidad es obligatoria').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createInput
);


module.exports = router;