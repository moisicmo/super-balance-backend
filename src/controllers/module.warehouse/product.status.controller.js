const { response } = require('express');
const { ProductStatusSchema, ProductSchema } = require('../../models');

const { transformProductStatus } = require('./../../helpers');

const getProductStatus = async (req, res = response) => {

    try {
        const productStatus = await ProductStatusSchema.find({ state: true })
            .populate('productId')
            .populate({
                path: 'productId',
                populate: [
                    { path: 'categoryId' },
                    { path: 'unitMeasurementId' }
                ]
            })
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

    const newProductStatus = new ProductStatusSchema(req.body);

    try {
        newProductStatus.userId = req.uid;
        const productStatusSave = await newProductStatus.save();
        const productWithRef = await ProductSchema.findById(productStatusSave.productId)
            .populate('userId', 'name')
            .populate('categoryId', 'name')
            .populate('unitMeasurementId', 'name').lean();
        const productStatus = await ProductStatusSchema.find({ productId: productWithRef._id })
            .populate('userId', 'name');
        productWithRef.productStatus = productStatus
        const populatedProduct = transformProductStatus(productWithRef);
        res.json({
            ok: true,
            product: populatedProduct
        });

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

        //preparamos el nuevo producto
        const productWithRef = await ProductSchema.findById(productStatusUpdate.productId)
            .populate('userId', 'name')
            .populate('categoryId', 'name')
            .populate('unitMeasurementId', 'name').lean();
        const newProductStatus = await ProductStatusSchema.find({ productId: productStatusUpdate.productId })
            .populate('userId', 'name');
        productWithRef.productStatus = newProductStatus;
        const populatedProduct = transformProductStatus(productWithRef);

        res.json({
            ok: true,
            product: populatedProduct
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
        //buscamos el id del producto con el estado
        const productStatus = await ProductStatusSchema.findById(productStatusId);
        //eliminamos el estado
        await ProductStatusSchema.findByIdAndDelete(productStatusId);
        //preparamos el nuevo producto
        const productWithRef = await ProductSchema.findById(productStatus.productId)
            .populate('userId', 'name')
            .populate('categoryId', 'name')
            .populate('unitMeasurementId', 'name').lean();
        const newProductStatus = await ProductStatusSchema.find({ productId: productStatus.productId })
            .populate('userId', 'name');
        productWithRef.productStatus = newProductStatus;
        const populatedProduct = transformProductStatus(productWithRef);

        res.json({
            ok: true,
            product: populatedProduct
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