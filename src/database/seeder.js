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
    //SUCURSALES
    {
        name: 'Ver sucursales',
        category: 'Sucursales',
        state: true,
    },
    {
        name: 'Crear sucursales',
        category: 'Sucursales',
        state: true,
    },
    {
        name: 'Editar sucursales',
        category: 'Sucursales',
        state: true,
    },
    {
        name: 'Eliminar sucursales',
        category: 'Sucursales',
        state: true,
    },
    //PRODUCTOS
    {
        name: 'Ver productos',
        category: 'Productos',
        state: true,
    },
    {
        name: 'Crear productos',
        category: 'Productos',
        state: true,
    },
    {
        name: 'Editar productos',
        category: 'Productos',
        state: true,
    },
    {
        name: 'Eliminar productos',
        category: 'Productos',
        state: true,
    },
    {
        name: 'Crear estado de productos eventos',
        category: 'Productos',
        state: true,
    },
    {
        name: 'Editar estado de productos eventos',
        category: 'Productos',
        state: true,
    },
    {
        name: 'Eliminar estado de productos eventos',
        category: 'Productos',
        state: true,
    },
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
    //UNIDADES DE MEDIDA
    {
        name: 'Ver unidades de medida',
        category: 'Unidades de medida',
        state: true,
    },
    {
        name: 'Crear unidades de medida',
        category: 'Unidades de medida',
        state: true,
    },
    {
        name: 'Editar unidades de medida',
        category: 'Unidades de medida',
        state: true,
    },
    {
        name: 'Eliminar unidades de medida',
        category: 'Unidades de medida',
        state: true,
    },
    //MOVIMIENTOS
    {
        name: 'Ver movimientos',
        category: 'Movimientos',
        state: true,
    },
    {
        name: 'Crear nueva recepcion',
        category: 'Movimientos',
        state: true,
    },
    //ORDENES
    {
        name: 'Ver ordenes',
        category: 'Ordenes',
        state: true,
    },
    {
        name: 'Crear ordenes',
        category: 'Ordenes',
        state: true,
    },
    {
        name: 'Editar ordenes',
        category: 'Ordenes',
        state: true,
    },
    {
        name: 'Eliminar ordenes',
        category: 'Ordenes',
        state: true,
    },
    {
        name: 'Descargar ordenes',
        category: 'Ordenes',
        state: true,
    },
    {
        name: 'Generar venta de ordenes',
        category: 'Ordenes',
        state: true,
    },
    //VENTAS
    {
        name: 'Ver ventas',
        category: 'Ventas',
        state: true,
    },
    {
        name: 'Descargar venta',
        category: 'Ventas',
        state: true,
    },
    //CLIENTES
    {
        name: 'Ver clientes',
        category: 'Clientes',
        state: true,
    },
    {
        name: 'Crear clientes',
        category: 'Clientes',
        state: true,
    },
    {
        name: 'Editar clientes',
        category: 'Clientes',
        state: true,
    },
    {
        name: 'Eliminar clientes',
        category: 'Clientes',
        state: true,
    },
    //CREDITOS
    {
        name: 'Ver creditos',
        category: 'Creditos',
        state: true,
    },
    {
        name: 'Crear creditos',
        category: 'Creditos',
        state: true,
    },
    {
        name: 'Editar creditos',
        category: 'Creditos',
        state: true,
    },
    {
        name: 'Pago de creditos',
        category: 'Creditos',
        state: true,
    },
    {
        name: 'Eliminar creditos',
        category: 'Creditos',
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
];