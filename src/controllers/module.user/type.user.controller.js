const { response } = require('express');
const { TypeUserSchema } = require('./../../models');

const getTypeUsers = async (req, res = response) => {

    try {
        const typeUsers = await TypeUserSchema.find()
            .populate('userId', 'name');

        res.json({
            ok: true,
            typeUsers
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createTypeUser = async (req, res = response) => {

    const typeUser = new TypeUserSchema(req.body);

    try {
        typeUser.userId = req.uid;

        const typeUserSave = await typeUser.save();
        const typeUserWithRef = await TypeUserSchema.findById(typeUserSave.id)
            .populate('userId', 'name');

        res.json({
            ok: true,
            typeUser: typeUserWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updateTypeUser = async (req, res = response) => {

    const typeUserId = req.params.id;

    try {

        const newTypeUser = {
            ...req.body
        }

        const typeUserUpdate = await TypeUserSchema.findByIdAndUpdate(typeUserId, newTypeUser, { new: true },);

        const typeUserWithRef = await TypeUserSchema.findById(typeUserUpdate.id)
            .populate('userId', 'name');
        res.json({
            ok: true,
            typeUser: typeUserWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteTypeUser = async (req, res = response) => {

    const typeUserId = req.params.id;
    try {

        await TypeUserSchema.findByIdAndDelete(typeUserId);
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
    getTypeUsers,
    createTypeUser,
    updateTypeUser,
    deleteTypeUser
}