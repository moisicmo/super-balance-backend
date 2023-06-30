const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('./../../middlewares');
const { typeUserExists } = require('./../../helpers');
const { getTypeUsers, createTypeUser, updateTypeUser, deleteTypeUser } = require('./../../controllers');

const router = Router();

router.use(validarJWT);


// Obtener tipos de usuarios 
router.get('/', getTypeUsers);

// Crear tipo de usuario
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(typeUserExists),
        validarCampos
    ], createTypeUser);

// editar tipo de usuario
router.put('/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(typeUserExists),
        validarCampos
    ], updateTypeUser
)

// eliminar tipo de usuario
router.delete('/:id', deleteTypeUser)
module.exports = router;