const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    userIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        }
    ],
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    address: {
        type: String,
        required: [true, 'La dirección es obligatorio']
    },
    phone: {
        type: Number,
        required: [true, 'El número es obligatorio']
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
