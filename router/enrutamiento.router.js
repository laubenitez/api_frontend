const express = require('express');
const clienteController = require('../controllers/cliente.controller');
const productoController = require('../controllers/producto.controller');
const servicioController = require('../controllers/servicio.controller');
const router = express.Router();

router.get('/', clienteController.home)
router.get('/formulario', clienteController.formulario)


router.get('/clientesvista', clienteController.consultar)
router.get('/clientes/:id', clienteController.consultarId)
router.post('/clientes', clienteController.registrar)
router.put('/clientes/:id', clienteController.actualizar)
router.delete('/clientes/:id', clienteController.eliminar)



router.get('/form_productos', productoController.form_productos)
router.get('/productosvista', productoController.consultar)
router.get('/productos/:id', productoController.consultarId)
router.post('/productos', productoController.registrar)
router.put('/productos/:id', productoController.actualizar)
router.delete('/productos/:id', productoController.eliminar)


router.get('/form_servicios', servicioController.form_servicios)
router.get('/serviciosvista', servicioController.consultar)
router.get('/servicios/:id', servicioController.consultarId)
router.post('/servicios', servicioController.registrar)
router.put('/servicios/:id', servicioController.actualizar)
router.delete('/servicios/:id', servicioController.eliminar)




module.exports = router;