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
},
    { timestamps: true });
ProductStatusSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (object.productId) {
        object.productId.id = object.productId._id
        delete object.productId._id;
        delete object.productId.__v;
    }
    if (object.priceId) {
        object.priceId.id = object.priceId._id
        delete object.priceId._id;
        delete object.priceId.__v;
    }
    if (object.userId) {
        object.userId.id = object.userId._id
        delete object.userId._id;
        delete object.userId.__v;
    }
    return object;
});


module.exports = model('ProductStatus', ProductStatusSchema);
