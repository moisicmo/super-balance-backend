const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const {
    getWarehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse
} = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getWarehouses)

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('address', 'La dirección es obligatorio').not().isEmpty(),
        check('phone', 'El teléfono es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createWarehouse
);
router.put(
    '/:id',
    updateWarehouse
);
router.delete(
    '/:id',
    deleteWarehouse
);


module.exports = router;