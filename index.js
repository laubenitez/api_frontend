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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

conectarDB();


app.get('/', clienteController.home)
app.get('/formulario', clienteController.formulario)


app.get('/clientes', clienteController.consultar)
app.get('/clientes/email/:email', clienteController.consultarId)
app.post('/clientes', clienteController.registrar)
app.put('/clientes/email/:email', clienteController.actualizar)
app.delete('/clientes/email/:email', clienteController.eliminar)


app.get('/servicios', servicioController.consultar)
app.get('/servicios/nombre/:nombre', servicioController.consultarId)
app.post('/servicios', servicioController.registrar)
app.put('/servicios/nombre/:nombre', servicioController.actualizar)
app.delete('/servicios/nombre/:nombre', servicioController.eliminar)

app.get('/productos', productoController.consultar)
app.get('/productos/nombre/:nombre', productoController.consultarId)
app.post('/productos', productoController.registrar)
app.put('/productos/nombre/:nombre', productoController.actualizar)
app.delete('/productos/nombre/:nombre', productoController.eliminar)



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



app.listen(process.env.PORT || 1999);