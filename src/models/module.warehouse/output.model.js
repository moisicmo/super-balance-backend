const { Schema, model } = require('mongoose');

const OutputSchema = Schema({
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
    discount: {
        type: Number,
        default: 0.00
    },
    typeDiscount: {
        type: String,
        default: 'amount'
    },
});
OutputSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('Outputs', OutputSchema);
