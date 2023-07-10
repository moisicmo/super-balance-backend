const { response } = require('express');
const { ProductSchema, ProductStatusSchema } = require('../../models');

const { transformProductStatus } = require('./../../helpers');

const getProducts = async (req, res = response) => {

    try {
        const products = await ProductSchema.find()
            .populate('userId', 'name')
            .populate('categoryId', 'name')
            .populate('unitMeasurementId', 'name').lean();
        const populatedProducts = await Promise.all(
            products.map(async (product) => {
                const productStatus = await ProductStatusSchema.find({ productId: product._id })
                    .populate('userId', 'name');
                product.productStatus = productStatus
                return transformProductStatus(product);
            })
        );
        res.json({
            ok: true,
            products: populatedProducts
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
        product.userId = req.uid;

        const productSave = await product.save();

        const newProductStatus = new ProductStatusSchema({
            productId: productSave.id,
            userId: req.uid,
            name: 'Ideal',
            price: req.body.price,
            discount: req.body.discount,
            typeDiscount: req.body.typeDiscount,
        });
        await newProductStatus.save();

        const productWithRef = await ProductSchema.findById(productSave.id)
            .populate('userId', 'name')
            .populate('categoryId', 'name')
            .populate('unitMeasurementId', 'name').lean();

        const productStatus = await ProductStatusSchema.find({ productId: productWithRef._id })
            .populate('userId', 'name');
        productWithRef.productStatus = productStatus
        const populatedUser = transformProductStatus(productWithRef);
        res.json({
            ok: true,
            product: populatedUser
        });

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
        if (newProduct.visible) {
            const productStatus = await ProductStatusSchema.find({ productId })
            if (productStatus.length == 0) {
                return res.status(500).json({
                    errors: [
                        {
                            msg: 'Antes de hacer visible el producto debe ver minimamente un estado',
                        }
                    ]
                });
            }
        }
        const productUpdate = await ProductSchema.findByIdAndUpdate(productId, newProduct, { new: true });

        const productWithRef = await ProductSchema.findById(productUpdate.id)
            .populate('userId', 'name')
            .populate('categoryId', 'name')
            .populate('unitMeasurementId', 'name').lean();
        const productStatus = await ProductStatusSchema.find({ productId: productWithRef._id })
            .populate('userId', 'name');
        productWithRef.productStatus = productStatus
        const populatedUser = transformProductStatus(productWithRef);
        res.json({
            ok: true,
            product: populatedUser
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
        await ProductSchema.findByIdAndDelete(productId);
        res.json({
            ok: true,
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