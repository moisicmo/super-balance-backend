const { Schema, model } = require('mongoose');

const CustomerSchema = Schema({
    typeDocumentId: {
        type: Schema.Types.ObjectId,
        ref: 'TypeDocuments',
        required: [true, 'El tipo de usuario es obligatorio']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    numberDocument: {
        type: Number,
        required: [true, 'El número del documento es obligatorio']
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    state: {
        type: Boolean,
        default: true
    },
},
    { timestamps: true });

CustomerSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (object.typeDocumentId) {
        object.typeDocumentId.id = object.typeDocumentId._id
        delete object.typeDocumentId._id;
        delete object.typeDocumentId.__v;
    }
    if (object.userId) {
        object.userId.id = object.userId._id
        delete object.userId._id;
    }
    return object;
});

module.exports = model('Customers', CustomerSchema);

