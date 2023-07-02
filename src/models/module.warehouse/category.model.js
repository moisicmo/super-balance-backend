const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
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
CategorySchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    return object;
});


module.exports = model('Categories', CategorySchema);