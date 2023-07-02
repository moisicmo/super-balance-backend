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
},
    { timestamps: true });
PriceSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (object.userId) {
        object.userId.id = object.userId._id
        delete object.userId._id;
        delete object.userId.__v;
    }
    return object;
});


module.exports = model('Prices', PriceSchema);
