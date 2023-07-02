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
});
KardexProductSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('KardexProducts', KardexProductSchema);
