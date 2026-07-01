require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);

require('dotenv').config();

const express = require('express');


const conectarDB = require('./config/connection');


// modelo
const Cliente = require('./models/cliente.model');
const Servicio = require('./models/servicio.model');
const Producto = require('./models/producto.model');
const clienteController = require('./controllers/cliente.controller');
const servicioController = require('./controllers/servicio.controller');
const productoController = require('./controllers/producto.controller');

const app = express();
const enrutamiento = require('./router/enrutamiento.router');

const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/api/v1', enrutamiento);



conectarDB();






app.get('/clientesvista', async function(req, res) {
    try {
        const clientes = await Cliente.find();

        res.render('pages/clientes', {
            clientes,
            mensaje: null
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al cargar clientes');
    }
});

app.get('/productosvista', async function(req, res) {
    try {
        const productos = await Producto.find();

        res.render('pages/productos', {
            productos,
            mensaje: null
        });

    } catch (error) {
        res.status(500).send('Error al cargar productos');
    }
});

app.get('/serviciosvista', async function(req, res) {
    try {
        const servicios = await Servicio.find();

        res.render('pages/servicios', {
            servicios,
            mensaje: null
        });

    } catch (error) {
        res.status(500).send('Error al cargar servicios');
    }
});

app.listen(process.env.PORT || 1999);