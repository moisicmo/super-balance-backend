const { Schema, model } = require('mongoose');

const ProductStatusSchema = Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
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
        if (object.productId.categoryId) {
            object.productId.categoryId.id = object.productId.categoryId._id
            delete object.productId.categoryId._id;
            delete object.productId.categoryId.__v;
        }
        if (object.productId.unitMeasurementId) {
            object.productId.unitMeasurementId.id = object.productId.unitMeasurementId._id
            delete object.productId.unitMeasurementId._id;
            delete object.productId.unitMeasurementId.__v;
        }
    }
    if (object.userId) {
        object.userId.id = object.userId._id
        delete object.userId._id;
        delete object.userId.__v;
    }
    return object;
});


module.exports = model('ProductStatus', ProductStatusSchema);
