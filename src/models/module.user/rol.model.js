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
        required: true
    },
    state: {
        type: Boolean,
        default: true
    },
});

RoleSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    object.permisionIds.forEach(e => {
        delete e.__v;
    });
    return object;
});

module.exports = model('Roles', RoleSchema);
