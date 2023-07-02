const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'Roles',
        required: [true, 'El rol es obligatorio']
    },
    typeUserId: {
        type: Schema.Types.ObjectId,
        ref: 'TypeUsers',
        required: [true, 'El tipo de usuario es obligatorio']
    },
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    lastName: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    responsibleId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    },
    valid: {
        type: Boolean,
        default: false
    },
    state: {
        type: Boolean,
        default: true
    },
    isSuperUser: {
        type: Boolean,
        default: false
    }
});

UserSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    if (object.roleId) {
        object.roleId.id = object.roleId._id
        delete object.roleId._id;
        delete object.roleId.__v;
        if (object.roleId.permisionIds) {
            object.roleId.permisionIds.forEach(e => {
                e.id = e._id;
                delete e._id;
                delete e.__v;
            });
        }
    }
    if (object.typeUserId) {
        object.typeUserId.id = object.typeUserId._id
        delete object.typeUserId._id;
        delete object.typeUserId.__v;
    }
    if (object.responsibleId) {
        object.responsibleId.id = object.responsibleId._id
        delete object.responsibleId._id;
    }
    return object;
});

module.exports = model('Users', UserSchema);

