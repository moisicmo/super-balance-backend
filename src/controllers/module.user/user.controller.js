const { response } = require('express');
const bcrypt = require('bcryptjs');
const { UserSchema, WarehouseSchema } = require('./../../models');

const { transformUserWarehouses } = require('./../../helpers');

const getUsers = async (req, res = response) => {
    try {
        const users = await UserSchema.find()
            .select('-password')
            .populate({
                path: 'roleId',
                populate: {
                    path: 'permisionIds'
                },
            })
            .populate('typeUserId', 'name')
            .populate('responsibleId', 'name').lean();
        const populatedUsers = await Promise.all(
            users.map(async (user) => {
                const warehouses = await WarehouseSchema.find({ userIds: { $in: [user._id] }, state: true })
                    .populate('userId', 'name')
                    .populate('userIds');
                user.warehouses = warehouses
                return transformUserWarehouses(user);
            })
        );
        res.json({
            ok: true,
            users: populatedUsers
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
        user.password = bcrypt.hashSync(user.email, salt);
        const userSave = await user.save();
        //agregar a warehouse
        req.body.warehouses.map(async (warehouseId) => {
            const warehouse = await WarehouseSchema.findById(warehouseId)
            let newWarehouse = { ...warehouse }
            newWarehouse._doc.userIds = [...newWarehouse._doc.userIds, userSave.id];
            await WarehouseSchema.findByIdAndUpdate(warehouseId, newWarehouse, { new: true },);
        })
        const userWithRef = await UserSchema.findById(userSave.id)
            .select('-password')
            .populate({
                path: 'roleId',
                populate: {
                    path: 'permisionIds'
                },
            })
            .populate('typeUserId', 'name')
            .populate('responsibleId', 'name')
            .lean();

        const warehouses = await WarehouseSchema.find({ userIds: { $in: [userWithRef._id] }, state: true })
            .populate('userId', 'name')
            .populate('userIds');

        userWithRef.warehouses = warehouses;

        const populatedUser = transformUserWarehouses(userWithRef);

        res.json({
            ok: true,
            user: populatedUser
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
            ...req.body,
        };
        const userUpdate = await UserSchema.findByIdAndUpdate(
            userId,
            newUser,
            { new: true }
        );
        if (req.body.warehouses) {
            const warehouseIds = req.body.warehouses;

            // Actualizar todos los almacenes en una sola consulta
            await WarehouseSchema.updateMany(
                { userIds: { $in: [userId] } },
                { $pull: { userIds: userId } }
            );

            await WarehouseSchema.updateMany(
                { _id: { $in: warehouseIds } },
                { $push: { userIds: userId } }
            );

        }


        const userWithRef = await UserSchema.findById(userUpdate.id)
            .select("-password")
            .populate({
                path: "roleId",
                populate: {
                    path: "permisionIds",
                },
            })
            .populate("typeUserId", "name")
            .populate("responsibleId", "name")
            .lean();

        const warehouses = await WarehouseSchema.find({
            userIds: { $in: [userWithRef._id] },
            state: true,
        })
            .populate("userId", "name")
            .populate("userIds");

        userWithRef.warehouses = warehouses;

        const populatedUser = transformUserWarehouses(userWithRef);

        res.json({
            ok: true,
            user: populatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const deleteUser = async (req, res = response) => {

    const userId = req.params.id;

    try {
        await UserSchema.findByIdAndDelete(userId);
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
    getUsers,
    createUser,
    updateUser,
    deleteUser,
}