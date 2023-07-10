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
        default: null
    },
},
    { timestamps: true });
InputSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (object.productStatusId) {
        object.productStatusId.id = object.productStatusId._id
        delete object.productStatusId._id;
        delete object.productStatusId.__v;
        if (object.productStatusId.productId) {
            object.productStatusId.productId.id = object.productStatusId.productId._id
            delete object.productStatusId.productId._id;
            delete object.productStatusId.productId.__v;
            if (object.productStatusId.productId.categoryId) {
                object.productStatusId.productId.categoryId.id = object.productStatusId.productId.categoryId._id
                delete object.productStatusId.productId.categoryId._id;
                delete object.productStatusId.productId.categoryId.__v;
            }
            if (object.productStatusId.productId.unitMeasurementId) {
                object.productStatusId.productId.unitMeasurementId.id = object.productStatusId.productId.unitMeasurementId._id
                delete object.productStatusId.productId.unitMeasurementId._id;
                delete object.productStatusId.productId.unitMeasurementId.__v;
            }
        }
    }
    if (object.userId) {
        object.userId.id = object.userId._id
        delete object.userId._id;
        delete object.userId.__v;
    }
    if (object.warehouseId) {
        object.warehouseId.id = object.warehouseId._id
        delete object.warehouseId._id;
        delete object.warehouseId.__v;
    }
    return object;
});


module.exports = model('Inputs', InputSchema);
