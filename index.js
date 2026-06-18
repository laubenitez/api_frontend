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
        const response = await fetch('https://mongo-connection-api2.onrender.com/clientes');
        const data = await response.json();

        res.render('pages/clientes', {
            clientes: data
        });

    } catch (error) {
        res.status(500).send('Error al cargar clientes');
    }
});

// Registrar cliente
// mostrar formulario
app.get('/clientes/nuevo', function(req, res) {
    res.render('pages/nuevoCliente');
});

// ruta para guardar
app.post('/clientes/nuevo', async (req, res) => {
    try {
        await fetch('https://mongo-connection-api2.onrender.com/clientes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        res.redirect('/clientesvista');
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// buscar cliente por email
app.get('/clientes/buscar/:email', async (req, res) => {
    try {
        const response = await fetch(
            `https://mongo-connection-api2.onrender.com/clientes/email/${req.params.email}`
        );

        const data = await response.json();

        res.render('pages/detalleCliente', { cliente: data });

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Actualizar cliente (PUT)
// Mostrar formulario con datos
app.get('/clientes/editar/:email', async (req, res) => {
    try {
        const response = await fetch(
            `https://mongo-connection-api2.onrender.com/clientes/email/${req.params.email}`
        );

        const data = await response.json();

        res.render('pages/editarCliente', { cliente: data });

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// guardar cambios
app.post('/clientes/editar/:email', async (req, res) => {
    try {
        await fetch(
            `https://mongo-connection-api2.onrender.com/clientes/email/${req.params.email}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            }
        );

        res.redirect('/clientesvista');

    } catch (error) {
        res.status(500).send(error.message);
    }
});

// eliminar cliente
app.post('/clientes/eliminar/:email', async (req, res) => {
    try {
        await fetch(
            `https://mongo-connection-api2.onrender.com/clientes/email/${req.params.email}`,
            {
                method: 'DELETE'
            }
        );

        res.redirect('/clientesvista');

    } catch (error) {
        res.status(500).send(error.message);
    }
});


app.get('/productosvista', function(req,res){
   fetch('https://mongo-connection-api2.onrender.com/productos')
   .then(response => response.json())
   .then(data => {
       res.render('pages/productos',
           {productos:data}
       )
   });
});


app.get('/serviciosvista', function(req,res){
   fetch('https://mongo-connection-api2.onrender.com/servicios')
   .then(response => response.json())
   .then(data => {
       res.render('pages/servicios',
           {servicios:data}
       )
   });
});



app.listen(1999);