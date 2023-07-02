const { Schema, model } = require('mongoose');

const WarehouseSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
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
},
    { timestamps: true });
WarehouseSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (object.userId) {
        object.userId.id = object.userId._id
        delete object.userId._id;
        delete object.userId.__v;
    }
    if (object.userIds) {
        object.userIds.forEach(e => {
            e.id = e._id;
            delete e._id;
            delete e.__v;
            delete e.roleId;
            delete e.typeUserId;
            delete e.valid;
            delete e.state;
            delete e.isSuperUser;
            delete e.password;
            delete e.responsibleId;
        });
    }
    return object;
});


module.exports = model('Warehouses', WarehouseSchema);
