const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos } = require('./../../middlewares');
const { typeDocumentExists } = require('./../../helpers');
const {
    getTypeDocuments,
    createTypeDocument, } = require('./../../controllers');

const router = Router();

router.use(validarJWT);


// Obtener tipos de documentos 
router.get('/', getTypeDocuments);

// Crear tipo de documento
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check("name").custom(typeDocumentExists),
        validarCampos
    ], createTypeDocument);

module.exports = router;