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
    if (object.warehouseId) {
        object.warehouseId.id = object.warehouseId._id
        delete object.warehouseId._id;
        delete object.warehouseId.__v;
    }
    if (object.inputOrOutput) {
        object.inputOrOutput.id = object.inputOrOutput._id
        delete object.inputOrOutput._id;
        delete object.inputOrOutput.__v;
        if (object.inputOrOutput.productStatusId) {
            object.inputOrOutput.productStatusId.id = object.inputOrOutput.productStatusId._id
            delete object.inputOrOutput.productStatusId._id;
            delete object.inputOrOutput.productStatusId.__v;
            if (object.inputOrOutput.productStatusId.productId) {
                object.inputOrOutput.productStatusId.productId.id = object.inputOrOutput.productStatusId.productId._id
                delete object.inputOrOutput.productStatusId.productId._id;
                delete object.inputOrOutput.productStatusId.productId.__v;
                if (object.inputOrOutput.productStatusId.productId.categoryId) {
                    object.inputOrOutput.productStatusId.productId.categoryId.id = object.inputOrOutput.productStatusId.productId.categoryId._id
                    delete object.inputOrOutput.productStatusId.productId.categoryId._id;
                    delete object.inputOrOutput.productStatusId.productId.categoryId.__v;
                }
                if (object.inputOrOutput.productStatusId.productId.unitMeasurementId) {
                    object.inputOrOutput.productStatusId.productId.unitMeasurementId.id = object.inputOrOutput.productStatusId.productId.unitMeasurementId._id
                    delete object.inputOrOutput.productStatusId.productId.unitMeasurementId._id;
                    delete object.inputOrOutput.productStatusId.productId.unitMeasurementId.__v;
                }
            }
        }
    }
    return object;
});


module.exports = model('KardexProducts', KardexProductSchema);
