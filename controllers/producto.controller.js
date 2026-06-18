const Producto = require('../models/producto.model');

exports.consultar = async (req, res) => {

    try{
        const productos = await Producto.find();
        res.json(productos);
    } catch (error){
        res.status(500).json({ error: error.message });
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


exports.registrar = async (req, res) => {

    try{
        let productoNuevo = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock: req.body.stock
        }

        const productos = await Producto.create(productoNuevo);
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