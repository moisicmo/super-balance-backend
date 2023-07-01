const { Schema, model } = require('mongoose');

const ProductStatusSchema = Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    priceId: {
        type: Schema.Types.ObjectId,
        ref: 'Prices',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    state: {
        type: Boolean,
        default: true
    },
});
ProductStatusSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('ProductStatus', ProductStatusSchema);
