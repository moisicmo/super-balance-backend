const { response } = require('express');
const { OutputSchema, KardexProductSchema } = require('../../models');

const getOutputs = async (req, res = response) => {

    try {
        const outputs = await OutputSchema.find()
            .populate('productStatusId')
            .populate('userId', 'name')
            .populate('warehouseId');

        res.json({
            ok: true,
            outputs
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createOutput = async (req, res = response) => {

    const output = new OutputSchema(req.body);

    try {
        //obtener el ultimo registro en el kardex
        const kardex = await KardexProductSchema.findOne({
            productStatusId: output.productStatusId,
            warehouseId: output.warehouseId,
        })
        if (!kardex) {
            return res.status(400).json({
                ok: false,
                msg: 'Es imposible hacer el registro porque no existen ingresos de stock'
            });
        }
        if (kardex.stock < output.quatity) {
            return res.status(400).json({
                ok: false,
                msg: 'El stock es inferior a la cantidad que requiere disminuir'
            });
        }
        output.userId = req.uid;

        const outputSave = await output.save();
        //registro en el kardex
        const newKardex = new KardexProductSchema({
            productStatusId: output.productStatusId,
            inputOrOutput: outputSave.id,
            modelRef: 'Outputs',
            warehouseId: output.warehouseId,
            detail: req.body.detail,
            stock: kardex.stock - output.quatity
        });
        await newKardex.save();
        const outputWithRef = await OutputSchema.findById(outputSave.id)
            .populate('productStatusId')
            .populate('userId', 'name')
            .populate('warehouseId');

        res.json({
            ok: true,
            output: outputWithRef
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
    getOutputs,
    createOutput,
}