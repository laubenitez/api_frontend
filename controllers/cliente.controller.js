const Cliente = require('../models/cliente.model');


exports.home = async(req, res) => {
    res.render('pages/index')
}



exports.formulario = async (req, res) => {
    res.render('pages/formulario')
}



exports.registrar = async (req, res) => {

    try{
        let clienteNuevo = {
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono
        }

        const clientes = await Cliente.insertOne(clienteNuevo);
        if (clientes){
            res.render('pages/formulario', {mensaje: 'Cliente registrado exitosamente'});
        }else{
            res.render('pages/formulario', {mensaje: 'Error al registrar el cliente'});
        }
    } catch (error){
        res.status(500).json({ error: error.message });
    }  
}

exports.consultar = async (req, res) => {

    try{
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

exports.consultarId = async (req, res) => {

    try{
        const clientes = await Cliente.findOne({email:req.params.email});
        console.log(clientes);
        res.json(clientes);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}



exports.actualizar = async (req, res) => {
    try{
        const actualizarCliente = {
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono
        }

        const clienteActualizado = await Cliente.findOneAndUpdate(
            { email: req.params.email }, 
            { $set: actualizarCliente }, 
            { new: true }
        );
        res.json(clienteActualizado);
    } catch (error){
        res.status(500).json({ error: error.message });
        }
}

exports.eliminar = async (req, res) => {
    try {
        const resultado = await Cliente.deleteOne({ email: req.params.email });

        res.json(resultado);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/**
 
en lugar de usar
module.exports para exportar
puede poner la palabra exports directamente en la funcion o variable
que deseo exportar


**/
