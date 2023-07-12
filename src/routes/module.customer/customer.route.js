const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const { getCustomers, createCustomer, updateCustomer, deleteCustomer } = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getCustomers)

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('phone', 'El teléfono es obligatorio').not().isEmpty(),
        check('numberDocument', 'El número de documento es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createCustomer
);
router.put(
    '/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('phone', 'El email es obligatorio').not().isEmpty(),
        check('numberDocument', 'El número de documento es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateCustomer
);
router.delete(
    '/:id',
    deleteCustomer
);


module.exports = router;