const Producto = require('../models/producto.model');


exports.form_productos = (req, res) => {
    res.render('pages/form_productos', { mensaje: null });
};


exports.registrar = async (req, res) => {
    try {

        // Validar nombre
        if (!/^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ\s]+$/.test(req.body.nombre)) {
            return res.render('pages/form_productos', {
                mensaje: 'El nombre del producto es inválido'
            });
        }

        // Validar precio
        if (req.body.precio <= 0) {
            return res.render('pages/form_productos', {
                mensaje: 'El precio debe ser mayor a 0'
            });
        }

        // Validar stock
        if (req.body.stock < 0) {
            return res.render('pages/form_productos', {
                mensaje: 'El stock no puede ser negativo'
            });
        }

        let productoNuevo = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock: req.body.stock,
        };

        const producto = await Producto.insertOne(productoNuevo);

        if (producto) {
            res.render('pages/form_productos', {
                mensaje: 'Producto registrado exitosamente'
            });
        }

    } catch (error) {
        console.log(error);
        res.render('pages/form_productos', {
            mensaje: 'Error del servidor'
        });
    }
};


exports.consultar = async (req, res) => {

    try{
        const productos = await Producto.find();
        res.render('pages/productos', { productos });
    } catch (error){
        res.render('pages/productos', { error: error.message });
    }
}

exports.consultarId = async (req, res) => {

    try{
        const productos = await Producto.findOne({nombre:req.params.nombre});
        console.log(productos);
        res.json(productos);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}



exports.actualizar = async (req, res) => {
    try{
        const actualizarProducto = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock: req.body.stock
        }

        const productoActualizado = await Producto.findOneAndUpdate(
            { nombre: req.params.nombre }, 
            { $set: actualizarProducto }, 
            { new: true }
        );
        res.json(productoActualizado);
    } catch (error){
        res.status(500).json({ error: error.message });
        }
}

exports.eliminar = async (req, res) => {
    try {
        const resultado = await Producto.deleteOne({ nombre: req.params.nombre });

        res.json(resultado);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};