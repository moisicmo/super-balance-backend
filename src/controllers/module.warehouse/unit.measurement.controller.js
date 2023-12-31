const { response } = require('express');
const { UnitMeasurementSchema, ProductSchema } = require('../../models');

const getMeasurementUnits = async (req, res = response) => {

    try {
        const measurementUnits = await UnitMeasurementSchema.find()
            .populate('userId', 'name');

        res.json({
            ok: true,
            measurementUnits
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createunitMeasurement = async (req, res = response) => {

    const unitMeasurement = new UnitMeasurementSchema(req.body);

    try {
        unitMeasurement.userId = req.uid;

        const unitMeasurementSave = await unitMeasurement.save();
        const unitMeasurementWithRef = await UnitMeasurementSchema.findById(unitMeasurementSave.id)
            .populate('userId', 'name');

        res.json({
            ok: true,
            unitMeasurement: unitMeasurementWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updateunitMeasurement = async (req, res = response) => {

    const unitMeasurementId = req.params.id;

    try {

        const newUnitMeasurement = {
            ...req.body
        }

        const unitMeasurementUpdate = await UnitMeasurementSchema.findByIdAndUpdate(unitMeasurementId, newUnitMeasurement, { new: true });

        const unitMeasurementWithRef = await UnitMeasurementSchema.findById(unitMeasurementUpdate.id)
            .populate('userId', 'name');
        res.json({
            ok: true,
            unitMeasurement: unitMeasurementWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteunitMeasurement = async (req, res = response) => {

    const unitMeasurementId = req.params.id;

    try {
        const product = await ProductSchema.find({ unitMeasurementId: unitMeasurementId })
        if (product.length > 0) {
            return res.status(400).json({
                errors: [{ msg: "No es posible eliminar esta unidad de medida ya que tiene una producto que lo usa" }]
            });
        }
        await UnitMeasurementSchema.findByIdAndDelete(unitMeasurementId);
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
    getMeasurementUnits,
    createunitMeasurement,
    updateunitMeasurement,
    deleteunitMeasurement,
}