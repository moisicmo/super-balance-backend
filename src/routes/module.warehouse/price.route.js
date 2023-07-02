const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const { priceExists } = require('./../../helpers');
const {
    getPrices,
    createPrice,
    updatePrice,
    deletePrice,
} = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getPrices)

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        check("name").custom(priceExists),
        validarCampos
    ],
    createPrice
);
router.put(
    '/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        check("name").custom(priceExists),
        validarCampos
    ],
    updatePrice
);
router.delete(
    '/:id',
    deletePrice
);


module.exports = router;