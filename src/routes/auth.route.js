const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('./../middlewares');
const { authUser } = require('./../controllers');


const router = Router();

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    authUser
);

module.exports = router;