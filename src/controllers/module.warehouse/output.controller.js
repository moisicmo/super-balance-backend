const { response } = require('express');
const { OutputSchema, KardexProductSchema } = require('../../models');

const getOutputs = async (req, res = response) => {

    try {
        const outputs = await OutputSchema.find()
            .populate('outputIds')
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



module.exports = {
    getOutputs,
}