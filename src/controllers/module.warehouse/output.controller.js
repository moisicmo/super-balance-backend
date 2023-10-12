const { response } = require('express');
const { OutputSchema, KardexProductSchema } = require('../../models');

const getOutputs = async (req, res = response) => {

    try {
        const outputs = await OutputSchema.find()
            .populate({
                path: 'productStatusId',
                populate: {
                    path: 'productId',
                    populate: [
                        { path: 'categoryId' },
                        { path: 'unitMeasurementId' }
                    ]
                },
            })
            .populate('userId', 'name')
            .populate('warehouseId');

        res.json({
            ok: true,
            outputs
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createOutput = async (req, res = response) => {

    const output = new OutputSchema(req.body);

    try {
        //obtener el ultimo registro en el kardex
        const kardex = await KardexProductSchema.findOne({
            productStatusId: output.productStatusId,
            warehouseId: output.warehouseId,
        }).sort({ createdAt: -1 });
        if (!kardex) {
            return res.status(400).json({
                ok: false,
                msg: 'Es imposible hacer el registro porque no existen ingresos de stock'
            });
        }
        if (kardex.stock < output.quatity) {
            return res.status(400).json({
                ok: false,
                msg: 'El stock es inferior a la cantidad que requiere disminuir'
            });
        }
        output.userId = req.uid;

        const outputSave = await output.save();
        //registro en el kardex
        const newKardex = new KardexProductSchema({
            productStatusId: output.productStatusId,
            inputOrOutput: outputSave.id,
            modelRef: 'Outputs',
            warehouseId: output.warehouseId,
            detail: req.body.detail,
            stock: kardex.stock - output.quatity
        });
        await newKardex.save();
        const outputWithRef = await OutputSchema.findById(outputSave.id)
            .populate({
                path: 'productStatusId',
                populate: {
                    path: 'productId',
                    populate: [
                        { path: 'categoryId' },
                        { path: 'unitMeasurementId' }
                    ]
                },
            })
            .populate('userId', 'name')
            .populate('warehouseId');

        res.json({
            ok: true,
            output: outputWithRef
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createSale = async (req, res = response) => {
    // const nuevaInscrpcion = new InscriptionSchema(req.body);

    try {
        // const validInscripcion = await InscriptionSchema.findOne({ season: req.body.season, student: req.body.student });
        // if (validInscripcion) {
        //     return res.status(500).json({
        //         errors: [{ msg: "El estudiante ya se encuentra inscrito en la presente temporada" }]
        //     });
        // }
        // const temporada = await SeasonSchema.findById(nuevaInscrpcion.season)
        // nuevaInscrpcion.responsible = req.uid;
        // nuevaInscrpcion.total = temporada.price;
        // nuevaInscrpcion.amountDelivered = req.body.total;
        // nuevaInscrpcion.returnedAmount = req.body.total - temporada.price;
        // const inscripcionGuardado = await nuevaInscrpcion.save();
        // const inscripcion = await InscriptionSchema.findById(inscripcionGuardado);
        // const usuario = await UserSchema.findById(nuevaInscrpcion.student)
        //     .select('name lastName code email state')
        //     .populate('rol', 'name')
        //     .populate('typeUser', 'name')
        //     .populate('responsible', 'name');

        // const estudiante = await Promise.all(
        //     [usuario].map(async (element) => {
        //         let inscripcion = await InscriptionSchema.findOne({ season: nuevaInscrpcion.season, student: element.id });
        //         const { __v, _id, ...object } = element.toObject();
        //         object.id = _id;
        //         return {
        //             ...object,
        //             inscripcion: inscripcion ? true : false,
        //         };
        //     })
        // );
        // console.log('inscrito ;3')
        // const detail = [
        //     {
        //         cant: 1,
        //         description: `Inscripcion ${temporada.name}`,
        //         price: temporada.price,
        //     },
        // ];
        const { pdfBase64, response } = await generateDocument(
            estudiante[0],
            inscripcionGuardado.id,
            req.uid,
            detail,
            req.body.total,
            moment(inscripcion.createdAt).format('DD/MM/YYYY hh:mm A'),
            `Inscripciones ${temporada.name}`
        );
        console.log(response.data)
        //actualizar tabla
        const updateInscriptionObj = {
            url: response.data.id
        };
        await InscriptionSchema.findByIdAndUpdate(inscripcionGuardado.id, { $set: updateInscriptionObj }, { new: true });
        const studentSuscribe = await InscriptionSchema.findOne({ season: temporada._id, student: estudiante[0].id })
            .populate('student', 'name lastName code email state')
            .populate('responsible', 'name lastName code email state')
        res.json({
            ok: true,
            studentSuscribe: studentSuscribe,
            document: pdfBase64
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            errors: [{ msg: "Por favor hable con el administrador" }]
        });
    }
};

module.exports = {
    getOutputs,
    createOutput,
    createSale,
}