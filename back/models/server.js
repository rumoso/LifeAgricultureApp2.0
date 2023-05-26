const express = require('express')
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.productsPath = '/api/products';
        this.unidadMedidaPath = '/api/unidadmedida';
        this.inventaryPath = '/api/inventary';
        this.authPath = '/api/auth';
        this.clientsPath = '/api/clients';
        this.salesPath = '/api/sales';

        //CONEXION A LA BASE DE DATOS
        this.dbConnection();

        this.middlewares();

        this.routes();
    }

    async dbConnection() {
        try {

            await dbConnection.authenticate();
            console.log('Database online');

        } catch (err) {
            throw new Error( err );
        }
    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        // LECTURA Y PARSEO DEL BODY
        this.app.use( express.json() );

        //DIRECTORIO PÚBLICO
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/userRoute'));
        this.app.use(this.productsPath, require('../routes/productsRoute'));
        this.app.use(this.unidadMedidaPath, require('../routes/unidadmedidaRoute'));
        this.app.use(this.inventaryPath, require('../routes/inventaryRoute'));
        this.app.use(this.authPath, require('../routes/authRoute'));
        this.app.use(this.clientsPath, require('../routes/clientsRoute'));
        this.app.use(this.salesPath, require('../routes/salesRoute'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port );
        } );
    }

}

module.exports = Server;