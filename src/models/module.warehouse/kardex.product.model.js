const { Schema, model } = require('mongoose');

const KardexProductSchema = Schema({
    productStatusId: {
        type: Schema.Types.ObjectId,
        ref: 'ProductStatus',
        required: true
    },
    inputOrOutput: {
        type: Schema.Types.ObjectId,
        refPath: 'modelRef',
        required: true
    },
    modelRef: {
        type: String,
        required: true,
        enum: ['Inputs', 'Outputs']
    },
    warehouseId: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouses',
        required: true
    },
    detail: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    stock: {
        type: Number,
        default: 0
    },
},
    { timestamps: true });
KardexProductSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (object.productStatusId) {
        object.productStatusId.id = object.productStatusId._id
        delete object.productStatusId._id;
        delete object.productStatusId.__v;
    }
    if (object.warehouseId) {
        object.warehouseId.id = object.warehouseId._id
        delete object.warehouseId._id;
        delete object.warehouseId.__v;
    }
    if (object.inputOrOutput) {
        object.inputOrOutput.id = object.inputOrOutput._id
        delete object.inputOrOutput._id;
        delete object.inputOrOutput.__v;
    }
    return object;
});


module.exports = model('KardexProducts', KardexProductSchema);
