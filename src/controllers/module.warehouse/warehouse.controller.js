const { response } = require('express');
const { WarehouseSchema } = require('../../models');

const getWarehouses = async (req, res = response) => {

    try {
        const warehouses = await WarehouseSchema.find()
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
        warehouse.user = req.uid;

        const warehouseSave = await warehouse.save();
        const warehouseWithRef = await WarehouseSchema.findById(warehouseSave.id)
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

        const newWarehouse = {
            ...warehouse,
            state: false
        }

        const warehouseDelete = await WarehouseSchema.findByIdAndUpdate(warehouseId, newWarehouse, { new: true },);

        const warehouseWithRef = await WarehouseSchema.findById(warehouseDelete.id)
            .populate('user', 'name');
        res.json({
            ok: true,
            warehouse: warehouseWithRef
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