const { Router } = require('express');
const { validarJWT } = require('./../../middlewares');
const {
    getOutputs,
} = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getOutputs)



module.exports = router;