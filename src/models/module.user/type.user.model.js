const { Schema, model } = require('mongoose');

const TypeUserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
});
TypeUserSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('TypeUsers', TypeUserSchema);
