const Servicio = require('../models/servicio.model');


exports.form_servicios = (req, res) => {
    res.render('pages/form_servicios', { mensaje: null });
};

exports.registrar = async (req, res) => {

    try{
        let servicioNuevo = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            duracionMinutos: req.body.duracionMinutos,
            categoria: req.body.categoria
        }

        const servicios = await Servicio.create(servicioNuevo);
        if (servicios){
            res.render('pages/form_servicios', {mensaje: 'Servicio registrado exitosamente'});
        }else{
            res.render('pages/form_servicios', {mensaje: 'Error al registrar el servicio'});
        }
    } catch (error){
         return res.render('pages/form_servicios', {
            mensaje: 'Error del servidor' });
    }
}


exports.consultar = async (req, res) => {

    try{
        const servicios = await Servicio.find();
        res.render('pages/servicios', { servicios });
    } catch (error){
        res.render('pages/servicios', { error: error.message });
    }
}

exports.consultarId = async (req, res) => {

    try{
        const servicio = await Servicio.findOne({nombre:req.params.nombre});
        console.log(servicio);
        res.json(servicio);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}




exports.actualizar = async (req, res) => {
    try{
        const actualizarServicio = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            duracionMinutos: req.body.duracionMinutos,
            categoria: req.body.categoria
        }

        const servicioActualizado = await Servicio.findOneAndUpdate(
            { nombre: req.params.nombre }, 
            { $set: actualizarServicio }, 
            { new: true }
        );
        res.json(servicioActualizado);
    } catch (error){
        res.status(500).json({ error: error.message });
        }
}

exports.eliminar = async (req, res) => {
    try {
        const resultado = await Servicio.deleteOne({ nombre: req.params.nombre });

        res.json(resultado);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

};