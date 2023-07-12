const { response } = require('express');
const { CustomerSchema } = require('./../../models');

const getCustomers = async (req, res = response) => {
    try {
        const customers = await CustomerSchema.find()
            .populate('typeDocumentId')
            .populate('userId', 'name');
        return res.json({
            ok: true,
            customers
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const createCustomer = async (req, res = response) => {

    const customer = new CustomerSchema(req.body);
    try {

        customer.userId = req.uid;

        const customerSave = await customer.save();
        const customerWithRef = await CustomerSchema.findById(customerSave.id)
            .populate('typeDocumentId')
            .populate('userId', 'name');

        res.json({
            ok: true,
            customer: customerWithRef
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const updateCustomer = async (req, res = response) => {
    const customerId = req.params.id;

    try {
        const newCustomer = {
            ...req.body
        }

        const customerUpdate = await CustomerSchema.findByIdAndUpdate(customerId, newCustomer, { new: true },);

        const customerWithRef = await CustomerSchema.findById(customerUpdate.id)
            .populate('userId', 'name');
        res.json({
            ok: true,
            customer: customerWithRef
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const deleteCustomer = async (req, res = response) => {

    const customerId = req.params.id;

    try {
        await CustomerSchema.findByIdAndDelete(customerId);
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
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
}