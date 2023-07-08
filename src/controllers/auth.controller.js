const { response } = require('express');
const bcrypt = require('bcryptjs');
const { UserSchema, WarehouseSchema } = require('./../models');
const { generarJWT, transformUserWarehouses } = require('./../helpers');


const authUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const user = await UserSchema.findOne({ email })
            .populate({
                path: 'roleId',
                populate: {
                    path: 'permisionIds'
                },
            })
            .populate('typeUserId', 'name')
            .populate('responsibleId', 'name')
            .lean();
        if (!user) {
            return res.status(400).json({
                errors: [{ msg: "Lo lamento no pudimos encontrarte" }]
            });
        }
        if (!user.state) {
            throw new Error("No tienes permitido el acceso");
        }
        const warehouses = await WarehouseSchema.find({ userIds: { $in: [user._id] }, state: true })
            .populate('userId', 'name')
            .populate('userIds');

        user.warehouses = warehouses;

        const populatedUser = transformUserWarehouses(user);

        const validPassword = bcrypt.compareSync(password, populatedUser.password);

        if (!validPassword) {
            return res.status(400).json({
                errors: [{ msg: "Contraseña incorrecto" }]
            });
        }


        const token = await generarJWT(populatedUser.id, populatedUser.name);
        populatedUser.password = undefined;
        res.json({
            ok: true,
            token,
            user: populatedUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }

}



module.exports = {
    authUser,
}