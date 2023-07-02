const { response } = require('express');
const { InputSchema } = require('../../models');

const getInputs = async (req, res = response) => {

    try {
        const inputs = await InputSchema.find()
            .populate('productStatusId')
            .populate('userId', 'name')
            .populate('Warehouses');

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
        input.user = req.uid;

        const inputSave = await input.save();
        const inputWithRef = await InputSchema.findById(inputSave.id)
            .populate('productStatusId')
            .populate('userId', 'name')
            .populate('Warehouses');

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