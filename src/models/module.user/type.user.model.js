const { Schema, model } = require('mongoose');


const TypeUserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    state: {
        type: Boolean,
        default: true
    },
},
    { timestamps: true }
);


TypeUserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (object.userId) {
        object.userId.id = object.userId._id
        delete object.userId._id;
    }
    return object;
});

module.exports = model('TypeUsers', TypeUserSchema);
