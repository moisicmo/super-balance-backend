const { Schema, model } = require('mongoose');

const InputSchema = Schema({
    productStatusId: {
        type: Schema.Types.ObjectId,
        ref: 'ProductStatus',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    warehouseId: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouses',
        required: true
    },
    quatity: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    dueDate: {
        type: Date,
        default: Date.now
    },
});
InputSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('Inputs', InputSchema);
