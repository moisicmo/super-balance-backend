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
        check('quatity', 'La cantidad es obligatoria').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createInput
);


module.exports = router;