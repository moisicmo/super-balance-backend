const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const {
    getOutputs,
    createOutput,
} = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getOutputs)

router.post(
    '/',
    [
        check('quatity', 'La cantidad es obligatoria').not().isEmpty(),
        check('price', 'El precio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createOutput
);


module.exports = router;