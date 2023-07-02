const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const { unitMEasurementExists } = require('./../../helpers');
const {
    getMeasurementUnits,
    createunitMeasurement,
    updateunitMeasurement,
    deleteunitMeasurement,
} = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getMeasurementUnits)

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(unitMEasurementExists),
        validarCampos
    ],
    createunitMeasurement
);
router.put(
    '/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(unitMEasurementExists),
        validarCampos
    ],
    updateunitMeasurement
);
router.delete(
    '/:id',
    deleteunitMeasurement
);


module.exports = router;