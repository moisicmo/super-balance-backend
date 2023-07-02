const { response } = require('express');
const bcrypt = require('bcryptjs');
const { UserSchema } = require('./../models');
const { generarJWT } = require('./../helpers');


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
            .populate('responsibleId', 'name');

        if (!user) {
            return res.status(400).json({
                errors: [{ msg: "Lo lamento no pudimos encontrarte" }]
            });
        }
        if (!user.state) {
            throw new Error("No tienes permitido el acceso");
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                errors: [{ msg: "Contraseña incorrecto" }]
            });
        }


        const token = await generarJWT(user.id, user.name);
        user.password = undefined;
        res.json({
            ok: true,
            token,
            user
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