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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('/api/v1', enrutamiento);

conectarDB();






app.get('/clientesvista', async function(req, res) {
    try {
        const response = await fetch('https://api-frontend-jtxo.onrender.com/clientes');
        const data = await response.json();

        res.render('pages/clientes', {
            clientes: data
        });

    } catch (error) {
        res.status(500).send('Error al cargar clientes');
    }
});

app.get('/productosvista', async function(req, res) {
    try {
        const response = await fetch('https://api-frontend-jtxo.onrender.com/productos');
        const data = await response.json();

        res.render('pages/productos', {
            productos: data
        });

    } catch (error) {
        res.status(500).send('Error al cargar productos');
    }
});

app.get('/serviciosvista', async function(req, res) {
    try {
        const response = await fetch('https://api-frontend-jtxo.onrender.com/servicios');
        const data = await response.json();

        res.render('pages/servicios', {
            servicios: data
        });

    } catch (error) {
        res.status(500).send('Error al cargar servicios');
    }
});

app.listen(process.env.PORT || 1999);