const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos } = require('./../../middlewares');
const { roleExists } = require('./../../helpers');
const { getRoles, createRol, updateRol, deleteRol } = require('./../../controllers');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);


// Obtener roles
router.get('/', getRoles);

//Crear nuevo rol
router.post(
    '/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(roleExists),
        validarCampos
    ],
    createRol
);
//Editar rol
router.put(
    '/:id',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(roleExists),
        validarCampos
    ],
    updateRol)
//Eliminar rol
router.delete('/:id', deleteRol)

module.exports = router;