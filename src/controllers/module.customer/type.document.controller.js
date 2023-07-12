const { response } = require('express');
const { TypeDocumentsSchema } = require('./../../models');

const getTypeDocuments = async (req, res = response) => {

    try {
        const typeDocuments = await TypeDocumentsSchema.find();

        res.json({
            ok: true,
            typeDocuments
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createTypeDocument = async (req, res = response) => {

    const typeDocument = new TypeDocumentsSchema(req.body);

    try {

        const typeDocumentSave = await typeDocument.save();

        res.json({
            ok: true,
            typeDocument: typeDocumentSave
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getTypeDocuments,
    createTypeDocument,
}