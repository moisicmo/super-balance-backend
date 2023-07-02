const { response } = require('express');
const bcrypt = require('bcryptjs');
const { UserSchema } = require('./../../models');

const getUsers = async (req, res = response) => {
    try {
        const users = await UserSchema.find({ state: true })
            .populate({
                path: 'roleId',
                populate: {
                    path: 'permisionIds'
                },
            })
            .populate('typeUserId', 'name')
            .populate('responsibleId', 'name');

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
        user.responsibleId = req.uid;

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);


        const userSave = await user.save();
        const userWithRef = await UserSchema.findById(userSave.id)
            .populate({
                path: 'roleId',
                populate: {
                    path: 'permisionIds'
                },
            })
            .populate('typeUserId', 'name')
            .populate('responsibleId', 'name');

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
            .populate({
                path: 'roleId',
                populate: {
                    path: 'permisionIds'
                },
            })
            .populate('typeUserId', 'name')
            .populate('responsibleId', 'name');

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
        if (user.isSuperUser) {
            return res.status(400).json({
                ok: false,
                msg: 'No es posible eliminar a un super usuario'
            });
        }
        let newUser = { ...user }
        newUser._doc.state = false;

        const userDelete = await UserSchema.findByIdAndUpdate(userId, newUser, { new: true },);
        const userWithRef = await UserSchema.findById(userDelete.id)
            .populate({
                path: 'roleId',
                populate: {
                    path: 'permisionIds'
                },
            })
            .populate('typeUserId', 'name')
            .populate('responsibleId', 'name');

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