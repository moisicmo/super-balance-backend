const { response } = require('express');
const { PriceSchema } = require('../../models');

const getPrices = async (req, res = response) => {

    try {
        const prices = await PriceSchema.find({ state: true })
            .populate('userId', 'name');

        res.json({
            ok: true,
            prices
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createPrice = async (req, res = response) => {

    const price = new PriceSchema(req.body);

    try {
        price.userId = req.uid;

        const priceSave = await price.save();
        const priceWithRef = await PriceSchema.findById(priceSave.id)
            .populate('userId', 'name');

        res.json({
            ok: true,
            price: priceWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updatePrice = async (req, res = response) => {

    const priceId = req.params.id;

    try {

        const newPrice = {
            ...req.body
        }

        const priceUpdate = await PriceSchema.findByIdAndUpdate(priceId, newPrice, { new: true });

        const priceWithRef = await PriceSchema.findById(priceUpdate.id)
            .populate('userId', 'name');
        res.json({
            ok: true,
            price: priceWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deletePrice = async (req, res = response) => {

    const priceId = req.params.id;

    try {
        const price = await PriceSchema.findById(priceId)

        let newPrice = { ...price }
        newPrice._doc.state = false;

        const priceDelete = await PriceSchema.findByIdAndUpdate(priceId, newPrice, { new: true });

        const priceWithRef = await PriceSchema.findById(priceDelete.id)
            .populate('userId', 'name');
        res.json({
            ok: true,
            price: priceWithRef
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
    getPrices,
    createPrice,
    updatePrice,
    deletePrice,
}