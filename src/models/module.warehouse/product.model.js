const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },
    unitMeasurementId: {
        type: Schema.Types.ObjectId,
        ref: 'MeasurementUnits',
        required: true
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    image: {
        type: String,
        default: null
    },
    barCode: {
        type: String,
        default: null
    },
    visible: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'Product'
    },
    state: {
        type: Boolean,
        default: true
    },
});
ProductSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('Products', ProductSchema);
