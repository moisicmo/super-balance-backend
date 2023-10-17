const { response } = require('express');
const { WarehouseSchema, UserSchema } = require('../../models');

const getWarehouses = async (req, res = response) => {

    try {
        const warehouses = await WarehouseSchema.find({ state: true })
            .populate('userId', 'name')
            .populate('userIds');

        res.json({
            ok: true,
            warehouses
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createWarehouse = async (req, res = response) => {

    const warehouse = new WarehouseSchema(req.body);

    try {
        warehouse.userId = req.uid;

        const warehouseSave = await warehouse.save();
        const warehouseWithRef = await WarehouseSchema.findById(warehouseSave.id)
            .populate('userId', 'name')
            .populate('userIds');

        res.json({
            ok: true,
            warehouse: warehouseWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updateWarehouse = async (req, res = response) => {

    const warehouseId = req.params.id;

    try {

        const newWarehouse = {
            ...req.body
        }

        const warehouseUpdate = await WarehouseSchema.findByIdAndUpdate(warehouseId, newWarehouse, { new: true },);

        const warehousewithRef = await WarehouseSchema.findById(warehouseUpdate.id)
            .populate('userId', 'name')
            .populate('userIds');
        res.json({
            ok: true,
            warehouse: warehousewithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteWarehouse = async (req, res = response) => {

    const warehouseId = req.params.id;

    try {
        const warehouse = await WarehouseSchema.findById(warehouseId)
        if (warehouse.userIds.length > 0) {
            return res.status(400).json({
                errors: [{ msg: "No es posible eliminar esta sucursal ya que lo usa un usuario" }]
            });
        }
        await WarehouseSchema.findByIdAndDelete(warehouseId);
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
    getWarehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse
}