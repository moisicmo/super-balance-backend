const express = require('express');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const { dbConnection } = require('./database');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);

        this.paths = {
            //auth
            auth: '/api/auth',
            //module users
            user: '/api/user',
            typeUser: '/api/typeuser',
            role: '/api/role',
            permision: '/api/permision',
            //module warehouses
            warehouse: '/api/warehouse',
            product: '/api/product',
            category: '/api/category',
            measurementUnit: '/api/measurementUnit',
            price: '/api/price',
            input: '/api/input',
            output: '/api/output',
            kardexProduct: '/api/kardexProduct',
            //module customers
            customer: '/api/customer',
            typeDocument: '/api/typeDocument',
            sale: '/api/sale',
            typeMethodPay: '/api/typeMethodPay',
            credit: '/api/credit',
            paymentCredit: '/api/paymentCredit',
            kardexCustomer: '/api/kardexCustomer',
            //module oreders
            outputReservation: '/api/outputReservation',
            order: '/api/order',
            //module report
            dashboard: '/api/dashboard',
            reports: '/api/reports',
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        this.app.use(express.json({ limit: '50mb' }));
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        const publicPath = path.resolve(__dirname, './../public');
        this.app.use(express.static(publicPath));
    }

    routes() {
        //auth
        // this.app.use(this.paths.auth, require('./routes/auth.route'));
        //module users
        this.app.use(this.paths.user, require('./routes/module.user/user.route'));
        this.app.use(this.paths.typeUser, require('./routes/module.user/type.user.route'));
        this.app.use(this.paths.role, require('./routes/module.user/role.route'));
        this.app.use(this.paths.permision, require('./routes/module.user/permision.route'));
        //
        // this.app.use(this.paths.event, require('./routes/events'));
        // this.app.use(this.paths.category, require('./routes/categories'));
        // this.app.use(this.paths.user, require('./routes/users'));
        // this.app.use(this.paths.typeUser, require('./routes/type_users'));
        // this.app.use(this.paths.permision, require('./routes/permisions'));
        // this.app.use(this.paths.rol, require('./routes/roles'));
        // this.app.use(this.paths.student, require('./routes/students'));
        // this.app.use(this.paths.guests, require('./routes/guests'));
        // this.app.use(this.paths.careers, require('./routes/careers'));
        // this.app.use(this.paths.dashboard, require('./routes/dashboard'));
        // this.app.use(this.paths.reports, require('./routes/reports'))

    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}


module.exports = Server;
