const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    code: {
        type: String,
        ref: 'Products'
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
        default: true
    },
    type: {
        type: String,
        default: 'Product'
    },
    state: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });

ProductSchema.pre('save', function (next) {
    if (!this.code) {
        const nameWithoutSpaces = this.name.replace(/\s/g, '');
        const truncatedName = nameWithoutSpaces.substr(0, 3).toUpperCase();
        const truncatedId = this._id.toString().substr(0, 2) + this._id.toString().substr(-2);
        this.code = (truncatedName + truncatedId).toUpperCase();
    }
    next();
});


ProductSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (object.userId) {
        object.userId.id = object.userId._id;
        delete object.userId._id;
        delete object.userId.__v;
    }
    if (object.categoryId) {
        object.categoryId.id = object.categoryId._id;
        delete object.categoryId._id;
        delete object.categoryId.__v;
    }
    if (object.unitMeasurementId) {
        object.unitMeasurementId.id = object.unitMeasurementId._id;
        delete object.unitMeasurementId._id;
        delete object.unitMeasurementId.__v;
    }
    return object;
});

module.exports = model('Products', ProductSchema);
