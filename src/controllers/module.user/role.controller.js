const { response } = require('express');
const { RoleSchema, UserSchema } = require('./../../models');

const getRoles = async (req, res = response) => {
    try {

        const roles = await RoleSchema.find({ state: true })
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
        rol.userId = req.uid;


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
        const user = await UserSchema.find({ roleId: rolId })
        if (user.length > 0) {
            return res.status(400).json({
                errors: [{ msg: "No es posible eliminar este rol ya que lo usa un usuario" }]
            });
        }
        await RoleSchema.findByIdAndDelete(rolId);
        res.json({
            ok: true,
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