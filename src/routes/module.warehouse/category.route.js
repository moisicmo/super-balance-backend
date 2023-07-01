const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('./../../controllers');

const router = Router();

router.use(validarJWT);

router.get('/', getCategories)

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createCategory
);
router.put(
    '/:id',
    updateCategory
);
router.delete(
    '/:id',
    deleteCategory
);


module.exports = router;