const { response } = require('express');
const bcrypt = require('bcryptjs');
const { UserSchema } = require('./../../models');

const getUsers = async (req, res = response) => {
    try {
        const users = await UserSchema.find()
            .populate('role', 'name')
            .populate('typeUser', 'name')
            .populate('responsible', 'name');

        res.json({
            ok: true,
            users
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const createUser = async (req, res = response) => {

    const user = new UserSchema(req.body);
    try {
        user.responsible = req.uid;

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.email, salt);


        const userSave = await user.save();
        const userWithRef = await UserSchema.findById(userSave.id)
            .populate('rol', 'name')
            .populate('typeUser', 'name')
            .populate('responsible', 'name');

        res.json({
            ok: true,
            user: userWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateUser = async (req, res = response) => {

    const userId = req.params.id;

    try {

        const newUser = {
            ...req.body
        }

        const userUpdate = await UserSchema.findByIdAndUpdate(userId, newUser, { new: true },);
        const userWithRef = await UserSchema.findById(userUpdate.id)
            .populate('rol', 'name')
            .populate('typeUser', 'name')
            .populate('responsible', 'name');

        res.json({
            ok: true,
            user: userWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteUser = async (req, res = response) => {

    const userId = req.params.id;

    try {
        const user = await UserSchema.findById(userId)
        const newUser = {
            ...user,
            state: false
        }

        const userDelete = await UserSchema.findByIdAndUpdate(userId, newUser, { new: true },);
        const userWithRef = await UserSchema.findById(userDelete.id)
            .populate('rol', 'name')
            .populate('typeUser', 'name')
            .populate('responsible', 'name');

        res.json({
            ok: true,
            user: userWithRef
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
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}