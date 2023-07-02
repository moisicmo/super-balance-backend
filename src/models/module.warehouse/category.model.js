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
},
    { timestamps: true });
CategorySchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (object.userId) {
        object.userId.id = object.userId._id
        delete object.userId._id;
        delete object.userId.__v;
    }
    return object;
});


module.exports = model('Categories', CategorySchema);
