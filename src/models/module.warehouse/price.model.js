const { Schema, model } = require('mongoose');

const PriceSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
});
PriceSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('Prices', PriceSchema);
