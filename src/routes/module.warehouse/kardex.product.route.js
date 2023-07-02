const { Router } = require('express');
const { validarJWT } = require('./../../middlewares');
const {
    getKardexProducts,
    getKardexProductsByProductId
} = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getKardexProducts)

router.get('/:id', getKardexProductsByProductId)

module.exports = router;