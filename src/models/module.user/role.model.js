const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    name: {
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    permisionIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Permisions',
            required: true
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    state: {
        type: Boolean,
        default: true
    },
});

RoleSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (object.permisionIds) {
        object.permisionIds.forEach(e => {
            e.id = e._id;
            delete e._id;
            delete e.__v;
        });
    }
    if (object.userId) {
        object.userId.id = object.userId._id
        delete object.userId._id;
    }
    return object;
});
module.exports = model('Roles', RoleSchema);
