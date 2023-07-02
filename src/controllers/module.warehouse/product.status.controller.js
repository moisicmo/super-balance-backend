const { response } = require('express');
const { ProductStatusSchema } = require('../../models');

const getProductStatus = async (req, res = response) => {

    try {
        const productStatus = await ProductStatusSchema.find()
            .populate('productId')
            .populate('priceId')
            .populate('userId', 'name')

        res.json({
            ok: true,
            productStatus
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createProductStatus = async (req, res = response) => {

    const productStatus = new ProductStatusSchema(req.body);

    try {
        productStatus.user = req.uid;

        const productStatusSave = await productStatus.save();
        const productStatusWithRef = await ProductStatusSchema.findById(productStatusSave.id)
            .populate('productId')
            .populate('priceId')
            .populate('userId', 'name')

        res.json({
            ok: true,
            productStatus: productStatusWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updateProductStatus = async (req, res = response) => {

    const productStatusId = req.params.id;

    try {

        const newProductSatus = {
            ...req.body
        }

        const productStatusUpdate = await ProductStatusSchema.findByIdAndUpdate(productStatusId, newProductSatus, { new: true });

        const productStatusWithRef = await ProductStatusSchema.findById(productStatusUpdate.id)
            .populate('productId')
            .populate('priceId')
            .populate('userId', 'name')
        res.json({
            ok: true,
            productStatus: productStatusWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteProductStatus = async (req, res = response) => {

    const productStatusId = req.params.id;

    try {
        const productStatus = await ProductStatusSchema.findById(productStatusId)

        const newProductStatus = {
            ...productStatus,
            state: false
        }

        const productStatusDelete = await ProductStatusSchema.findByIdAndUpdate(productStatusId, newProductStatus, { new: true });

        const productStatusWithRef = await ProductStatusSchema.findById(productStatusDelete.id)
            .populate('productId')
            .populate('priceId')
            .populate('userId', 'name')
        res.json({
            ok: true,
            productStatus: productStatusWithRef
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
    getProductStatus,
    createProductStatus,
    updateProductStatus,
    deleteProductStatus,
}