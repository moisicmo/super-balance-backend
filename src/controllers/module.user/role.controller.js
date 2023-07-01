const { response } = require('express');
const { RoleSchema } = require('./../../models');

const getRoles = async (req, res = response) => {
    try {

        const roles = await RoleSchema.find()
            .populate('permisionIds')
            .populate('userId', 'name');

        res.json({
            ok: true,
            roles
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }
}
const createRol = async (req, res = response) => {

    const rol = new RoleSchema(req.body);

    try {
        rol.user = req.uid;


        const roleSave = await rol.save();
        const roleWithRef = await RoleSchema.findById(roleSave.id)
            .populate('permisionIds')
            .populate('userId', 'name');

        res.json({
            ok: true,
            role: roleWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }
}
const updateRol = async (req, res = response) => {

    const rolId = req.params.id;

    try {
        const newRole = {
            ...req.body
        }

        const roleUpdate = await RoleSchema.findByIdAndUpdate(rolId, newRole, { new: true },);
        const roleWithRef = await RoleSchema.findById(roleUpdate.id)
            .populate('permisionIds')
            .populate('userId', 'name');

        res.json({
            ok: true,
            role: roleWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteRol = async (req, res = response) => {

    const rolId = req.params.id;

    try {
        const role = await RoleSchema.findById(rolId)

        const newRole = {
            ...role,
            state: false
        }

        const roleDelete = await RoleSchema.findByIdAndUpdate(rolId, newRole, { new: true },);
        const roleWithRef = await RoleSchema.findById(roleDelete.id)
            .populate('permisionIds')
            .populate('userId', 'name');

        res.json({
            ok: true,
            role: roleWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
module.exports = {
    getRoles,
    createRol,
    updateRol,
    deleteRol
}