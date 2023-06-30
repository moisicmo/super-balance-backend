const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Roles',
        required: [true, 'El rol es obligatorio']
    },
    typeUser: {
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
    responsible: {
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
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Users', UserSchema);

