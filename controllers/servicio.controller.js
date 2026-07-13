const Servicio = require('../models/servicio.model');


exports.form_servicios = (req, res) => {
    res.render('pages/form_servicios', { mensaje: null });
};

exports.registrar = async (req, res) => {
    try {

        // Validar nombre
        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(req.body.nombre)) {
            return res.render('pages/form_servicios', {
                mensaje: 'El nombre solo debe contener letras'
            });
        }

        // Validar precio
        if (req.body.precio <= 0) {
            return res.render('pages/form_servicios', {
                mensaje: 'El precio debe ser mayor a 0'
            });
        }

        // Validar duración
        if (req.body.duracionMinutos <= 0) {
            return res.render('pages/form_servicios', {
                mensaje: 'La duración debe ser mayor a 0'
            });
        }

        let servicioNuevo = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            duracionMinutos: req.body.duracionMinutos,
            categoria: req.body.categoria
        }

        const servicios = await Servicio.insertOne(servicioNuevo);

        if (servicios) {
            res.render('pages/form_servicios', {
                mensaje: 'Servicio registrado exitosamente'
            });
        }

    } catch (error) {
        console.log(error);
        return res.render('pages/form_servicios', {
            mensaje: 'Error del servidor'
        });
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
    try {
        const { nombre, precio, duracionMinutos, categoria } = req.body;

        // Validar nombre
        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre)) {
            const servicios = await Servicio.find();
            return res.render('pages/servicios', {
                servicios,
                mensaje: 'El nombre solo debe contener letras'
            });
        }

        // Validar precio
        if (precio <= 0) {
            const servicios = await Servicio.find();
            return res.render('pages/servicios', {
                servicios,
                mensaje: 'El precio debe ser mayor a 0'
            });
        }

        // Validar duración
        if (duracionMinutos <= 0) {
            const servicios = await Servicio.find();
            return res.render('pages/servicios', {
                servicios,
                mensaje: 'La duración debe ser mayor a 0'
            });
        }

        const datos = {
            nombre,
            precio,
            duracionMinutos,
            categoria
        };

        await Servicio.findByIdAndUpdate(
            req.params.id,
            datos,
            { returnDocument: 'after' }
        );

        res.redirect('/serviciosvista');

    } catch (error) {

        const servicios = await Servicio.find();

        res.render('pages/servicios', {
            servicios,
            mensaje: 'Error del servidor'
        });
    }
};

exports.eliminar = async (req, res) => {
    try {

        await Servicio.findByIdAndDelete(req.params.id);

        res.redirect('/serviciosvista');

    } catch (error) {

        const servicios = await Servicio.find();

        res.render('pages/servicios', {
            servicios,
            mensaje: 'Error al eliminar el servicio'
        });
    }
};