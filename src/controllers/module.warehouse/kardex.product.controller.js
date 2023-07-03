const { response } = require('express');
const { KardexProductSchema } = require('../../models');

const getKardexProducts = async (req, res = response) => {

    try {
        const kardexProducts = await KardexProductSchema.find()
            .populate({
                path: 'inputOrOutput',
                populate: {
                    path: 'productStatusId',
                    populate: {
                        path: 'productId',
                        populate: [
                            { path: 'categoryId' },
                            { path: 'unitMeasurementId' }
                        ]
                    },
                }
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
const getKardexProductsByProductId = async (req, res = response) => {
    const productStatusId = req.params.id;
    try {
        const kardexProducts = await KardexProductSchema.find({ productStatusId })
            .populate({
                path: 'inputOrOutput',
                populate: {
                    path: 'productStatusId',
                    populate: {
                        path: 'productId',
                        populate: [
                            { path: 'categoryId' },
                            { path: 'unitMeasurementId' }
                        ]
                    },
                }
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
module.exports = {
    getKardexProducts,
    getKardexProductsByProductId
}