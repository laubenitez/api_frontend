const express = require('express');
const clienteController = require('../controllers/cliente.controller');
const productoController = require('../controllers/producto.controller');
const servicioController = require('../controllers/servicio.controller');
const router = express.Router();

router.get('/', clienteController.home)
router.get('/formulario', clienteController.formulario)


router.get('/clientesvista', clienteController.consultar)
router.get('/clientes/email/:email', clienteController.consultarId)
router.post('/clientes', clienteController.registrar)
router.put('/clientes/email/:email', clienteController.actualizar)
router.delete('/clientes/email/:email', clienteController.eliminar)



router.get('/form_productos', productoController.form_productos)
router.get('/productosvista', productoController.consultar)
router.get('/productos/nombre/:nombre', productoController.consultarId)
router.post('/productos', productoController.registrar)
router.put('/productos/nombre/:nombre', productoController.actualizar)
router.delete('/productos/nombre/:nombre', productoController.eliminar)


router.get('/form_servicios', servicioController.form_servicios)
router.get('/serviciosvista', servicioController.consultar)
router.get('/servicios/nombre/:nombre', servicioController.consultarId)
router.post('/servicios', servicioController.registrar)
router.put('/servicios/nombre/:nombre', servicioController.actualizar)
router.delete('/servicios/nombre/:nombre', servicioController.eliminar)




module.exports = router;