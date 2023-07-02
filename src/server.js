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
            category: '/api/category',
            unitMeasurement: '/api/unitMeasurement',
            product: '/api/product',
            productStatus: '/api/productStatus',
            price: '/api/price',
            output: '/api/output',
            input: '/api/input',
            kardexProduct: '/api/kardexProduct',
            //module customers
            customer: '/api/customer',
            typeDocument: '/api/typeDocument',
            sale: '/api/sale',
            typeMethodPay: '/api/typeMethodPay',
            credit: '/api/credit',
            paymentCredit: '/api/paymentCredit',
            kardexCredit: '/api/kardexCredit',
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
        this.app.use(this.paths.auth, require('./routes/auth.route'));
        //module users
        this.app.use(this.paths.user, require('./routes/module.user/user.route'));
        this.app.use(this.paths.typeUser, require('./routes/module.user/type.user.route'));
        this.app.use(this.paths.role, require('./routes/module.user/role.route'));
        this.app.use(this.paths.permision, require('./routes/module.user/permision.route'));
        //module warehouses
        this.app.use(this.paths.warehouse, require('./routes/module.warehouse/warehouse.route'));
        this.app.use(this.paths.category, require('./routes/module.warehouse/category.route'));
        this.app.use(this.paths.unitMeasurement, require('./routes/module.warehouse/unit.measurement.route'));
        this.app.use(this.paths.product, require('./routes/module.warehouse/product.route'));
        this.app.use(this.paths.productStatus, require('./routes/module.warehouse/product.status.route'));
        this.app.use(this.paths.price, require('./routes/module.warehouse/price.route'));
        this.app.use(this.paths.input, require('./routes/module.warehouse/input.route'));
        this.app.use(this.paths.output, require('./routes/module.warehouse/output.route'));
        this.app.use(this.paths.kardexProduct, require('./routes/module.warehouse/kardex.product.route'));
        //module customers
        //module orders
        //module reports
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}


module.exports = Server;
