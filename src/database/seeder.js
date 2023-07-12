require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {
    UserSchema,
    RoleSchema,
    PermisionSchema,
    TypeUserSchema,
    TypeDocumentsSchema
} = require('./../models');

// Conecta a la base de datos
mongoose.connect(process.env.DB_CNN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Establece la conexión antes de borrar la base de datos y las colecciones
mongoose.connection.on('connected', () => {
    // Borra todas las colecciones
    mongoose.connection.db.dropDatabase()
        .then(async () => {
            console.log('Base de datos borrada correctamente.');
            //creando TIPOS DE DOCUMENTOS
            await TypeDocumentsSchema.insertMany(TypeDocuments);
            //creando PERMISOS
            const listPermisions = await PermisionSchema.insertMany(permisions);
            const idPermisions = listPermisions.map(e => e._id);
            // creando ROL
            const rol = RoleSchema({
                name: 'Desarrollador',
                permisionIds: idPermisions,
                userId: null,
                state: true,
            });
            const rolCreated = await rol.save();
            // creando TIPO DE USUARIO
            const TypeUser = new TypeUserSchema({
                name: 'Desarrollador',
                userId: null,
                state: true
            });
            const typeUserCreated = await TypeUser.save();
            // creando USUARIO
            const user = new UserSchema({
                roleId: rolCreated._id,
                typeUserId: typeUserCreated._id,
                name: 'moises',
                lastName: 'Ochoa',
                email: 'moisic.mo@gmail.com',
                password: 'moisic.mo@gmail.com',
                responsibleId: null,
                valid: true,
                state: true,
                isSuperUser: true
            });
            const userCreated = await user.save();
            // editando ROL
            const updateRolObj = { userId: userCreated._id };
            await RoleSchema.findByIdAndUpdate(rolCreated._id, updateRolObj, { new: true });
            //editando TIPO DE USUARIO
            const updateTypeUserObj = { userId: userCreated._id };
            await TypeUserSchema.findByIdAndUpdate(typeUserCreated._id, updateTypeUserObj, { new: true });
            //editando USUARIO
            const salt = bcrypt.genSaltSync();
            const updateUserObj = { responsibleId: userCreated._id, password: bcrypt.hashSync(userCreated.email, salt) };

            await UserSchema.findByIdAndUpdate(userCreated._id, updateUserObj, { new: true });

        })
        .catch(err => console.error(err))
        .finally(() => {
            // Cierra la conexión a la base de datos al finalizar
            mongoose.connection.close();
        });
});

const TypeDocuments = [
    {
        name: 'Carnet de identidad'
    },
    {
        name: 'Pasaporte'
    },
    {
        name: 'Nit'
    },
];
//lista de PERMISOS
const permisions = [
    //CATEGORIAS
    {
        name: 'Ver categorias',
        category: 'Categorias',
        state: true,
    },
    {
        name: 'Crear categorias',
        category: 'Categorias',
        state: true,
    },
    {
        name: 'Editar categorias',
        category: 'Categorias',
        state: true,
    },
    {
        name: 'Eliminar categorias',
        category: 'Categorias',
        state: true,
    },
    //EXPOSITORES
    {
        name: 'Ver expositores',
        category: 'Expositores',
        state: true,
    },
    {
        name: 'Crear expositores',
        category: 'Expositores',
        state: true,
    },
    {
        name: 'Editar expositores',
        category: 'Expositores',
        state: true,
    },
    {
        name: 'Eliminar expositores',
        category: 'Expositores',
        state: true,
    },
    //EVENTOS
    {
        name: 'Ver eventos',
        category: 'Eventos',
        state: true,
    },
    {
        name: 'Crear eventos',
        category: 'Eventos',
        state: true,
    },
    {
        name: 'Ver reportes de eventos',
        category: 'Eventos',
        state: true,
    },
    {
        name: 'Editar eventos',
        category: 'Eventos',
        state: true,
    },
    {
        name: 'Eliminar eventos',
        category: 'Eventos',
        state: true,
    },
    //USUARIOS
    {
        name: 'Ver usuarios',
        category: 'Usuarios',
        state: true,
    },
    {
        name: 'Crear usuarios',
        category: 'Usuarios',
        state: true,
    },
    {
        name: 'Editar usuarios',
        category: 'Usuarios',
        state: true,
    },
    {
        name: 'Eliminar usuarios',
        category: 'Usuarios',
        state: true,
    },
    //TIPOS DE USUARIO
    {
        name: 'Ver tipos de usuario',
        category: 'Tipos de usuario',
        state: true,
    },
    {
        name: 'Crear tipos de usuario',
        category: 'Tipos de usuario',
        state: true,
    },
    {
        name: 'Editar tipos de usuario',
        category: 'Tipos de usuario',
        state: true,
    },
    {
        name: 'Eliminar tipos de usuario',
        category: 'Tipos de usuario',
        state: true,
    },
    //ROLES
    {
        name: 'Ver roles',
        category: 'Roles',
        state: true,
    },
    {
        name: 'Crear roles',
        category: 'Roles',
        state: true,
    },
    {
        name: 'Editar roles',
        category: 'Roles',
        state: true,
    },
    {
        name: 'Eliminar roles',
        category: 'Roles',
        state: true,
    },
    //PERMISOS
    {
        name: 'Ver permisos',
        category: 'Permisos',
        state: true,
    },
    //REPORTES
    {
        name: 'Ver reportes',
        category: 'Reportes',
        state: true,
    },
    //ESTUDIANTES
    {
        name: 'Ver estudiantes',
        category: 'Estudiantes',
        state: true,
    },
    {
        name: 'Agregar estudiantes',
        category: 'Estudiantes',
        state: true,
    },
];