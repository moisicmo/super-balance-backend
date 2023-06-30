const { response } = require('express');
const { PermisionSchema } = require('./../../models');

const getPermisions = async (req, res = response) => {

    try {
        const permisos = await PermisionSchema.find({ state: true });
        res.json({
            ok: true,
            permisos
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createPermision = async (req, res = response) => {

    const Permision = new PermisionSchema(req.body);

    try {

        const permisionSave = await Permision.save();

        res.json({
            ok: true,
            permiso: permisionSave
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
module.exports = {
    getPermisions,
    createPermision,
}