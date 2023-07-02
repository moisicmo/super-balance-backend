const { response } = require('express');
const { KardexProductSchema } = require('../../models');

const getKardexProducts = async (req, res = response) => {

    try {
        const kardexProducts = await KardexProductSchema.find()
            .populate('productStatusId')
            .populate({
                path: 'inputOrOutput',
                populate: { path: 'Inputs Outputs' }
            })
            .populate('warehouseId');

        res.json({
            ok: true,
            kardexProducts
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createKardexProduct = async (req, res = response) => {

    const kardexProduct = new KardexProductSchema(req.body);

    try {
        kardexProduct.user = req.uid;

        const kardexProductSave = await kardexProduct.save();
        const kardexProductWithRef = await KardexProductSchema.findById(kardexProductSave.id)
            .populate('productStatusId')
            .populate({
                path: 'inputOrOutput',
                populate: { path: 'Inputs Outputs' }
            })
            .populate('warehouseId');

        res.json({
            ok: true,
            kardexProduct: kardexProductWithRef
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
    getKardexProducts,
    createKardexProduct,
}