const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('./../../middlewares');
const { permisionExists } = require('./../../helpers');
const { getPermisions, createPermision, } = require('./../../controllers');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use(validarJWT);


// Obtener permisos
router.get('/', getPermisions);
//Crear permiso
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(permisionExists),
        check("category", 'La categoria es obligatoria').not().isEmpty(),
        validarCampos
    ], createPermision);

module.exports = router;