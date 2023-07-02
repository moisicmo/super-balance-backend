const { response } = require('express');
const { OutputSchema } = require('../../models');

const getOutputs = async (req, res = response) => {

    try {
        const outputs = await OutputSchema.find()
            .populate('productStatusId')
            .populate('userId', 'name')
            .populate('Warehouses');

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
        output.user = req.uid;

        const outputSave = await output.save();
        const outputWithRef = await OutputSchema.findById(outputSave.id)
            .populate('productStatusId')
            .populate('userId', 'name')
            .populate('Warehouses');

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