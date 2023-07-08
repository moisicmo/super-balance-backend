const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos, validarJWT } = require('./../../middlewares');
const { getUsers, createUser, updateUser, deleteUser } = require('./../../controllers');
const { emailExists } = require('./../../helpers');

const router = Router();

router.use(validarJWT);

router.get('/', getUsers)

router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check("email").custom(emailExists),
        check('typeUserId', 'El tipo de usuario es obligatorio').not().isEmpty(),
        check('roleId', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    createUser
);
router.put(
    '/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('lastName', 'El apellido es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check("email").custom(emailExists),
        check('typeUserId', 'El tipo de usuario es obligatorio').not().isEmpty(),
        check('roleId', 'El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    updateUser
);
router.delete(
    '/:id',
    deleteUser
);


module.exports = router;