const { response } = require('express');
const { InputSchema, KardexProductSchema } = require('../../models');

const getInputs = async (req, res = response) => {

    try {
        const inputs = await InputSchema.find()
            .populate('productStatusId')
            .populate('userId', 'name')
            .populate('warehouseId');

        res.json({
            ok: true,
            inputs
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createInput = async (req, res = response) => {

    const input = new InputSchema(req.body);

    try {
        input.userId = req.uid;

        const inputSave = await input.save();
        //registro en el kardex
        const kardex = await KardexProductSchema.findOne({
            productStatusId: input.productStatusId,
            warehouseId: input.warehouseId,
        })
        const newKardex = new KardexProductSchema({
            productStatusId: input.productStatusId,
            inputOrOutput: inputSave.id,
            modelRef: 'Inputs',
            warehouseId: input.warehouseId,
            detail: req.body.detail,
            stock: kardex ? (kardex.stock + input.quatity) : input.quatity
        });
        await newKardex.save();
        const inputWithRef = await InputSchema.findById(inputSave.id)
            .populate('productStatusId')
            .populate('userId', 'name')
            .populate('warehouseId');

        res.json({
            ok: true,
            input: inputWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
module.exports = {
    getInputs,
    createInput,
}