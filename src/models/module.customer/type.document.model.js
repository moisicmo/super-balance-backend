const { Schema, model } = require('mongoose');


const TypeDocumentsSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
},
    { timestamps: true }
);


TypeDocumentsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('TypeDocuments', TypeDocumentsSchema);
