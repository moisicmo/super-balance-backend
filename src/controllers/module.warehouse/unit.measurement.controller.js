const { response } = require('express');
const { UnitMeasurementSchema } = require('../../models');

const getMeasurementUnits = async (req, res = response) => {

    try {
        const measurementUnits = await UnitMeasurementSchema.find({ state: true })
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
        const unitMeasurement = await UnitMeasurementSchema.findById(unitMeasurementId)

        let newCategory = { ...unitMeasurement }
        newCategory._doc.state = false;

        const unitMeasurementDelete = await UnitMeasurementSchema.findByIdAndUpdate(unitMeasurementId, newCategory, { new: true });

        const unitMeasurementWithRef = await UnitMeasurementSchema.findById(unitMeasurementDelete.id)
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
module.exports = {
    getMeasurementUnits,
    createunitMeasurement,
    updateunitMeasurement,
    deleteunitMeasurement,
}