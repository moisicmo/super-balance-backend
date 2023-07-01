const { response } = require('express');
const { ProductSchema } = require('../../models');

const getProducts = async (req, res = response) => {

    try {
        const products = await ProductSchema.find()
            .populate('userId', 'name')
            .populate('categoryId', 'name')
            .populate('unitMeasurementId', 'name');

        res.json({
            ok: true,
            products
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createProduct = async (req, res = response) => {

    const product = new ProductSchema(req.body);

    try {
        product.user = req.uid;

        const productSave = await product.save();
        const productWithRef = await ProductSchema.findById(productSave.id)
            .populate('userId', 'name')
            .populate('categoryId', 'name')
            .populate('unitMeasurementId', 'name');

        res.json({
            ok: true,
            product: productWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updateProduct = async (req, res = response) => {

    const productId = req.params.id;

    try {

        const newProduct = {
            ...req.body
        }

        const productUpdate = await ProductSchema.findByIdAndUpdate(productId, newProduct, { new: true });

        const productWithRef = await ProductSchema.findById(productUpdate.id)
            .populate('userId', 'name')
            .populate('categoryId', 'name')
            .populate('unitMeasurementId', 'name');
        res.json({
            ok: true,
            product: productWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteProduct = async (req, res = response) => {

    const productId = req.params.id;

    try {
        const product = await ProductSchema.findById(productId)

        const newProduct = {
            ...product,
            state: false
        }

        const productDelete = await ProductSchema.findByIdAndUpdate(productId, newProduct, { new: true });

        const productWithRef = await ProductSchema.findById(productDelete.id)
            .populate('userId', 'name')
            .populate('categoryId', 'name')
            .populate('unitMeasurementId', 'name');
        res.json({
            ok: true,
            product: productWithRef
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
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}