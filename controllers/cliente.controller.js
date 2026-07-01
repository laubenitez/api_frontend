const Cliente = require('../models/cliente.model');


exports.home = async(req, res) => {
    res.render('pages/index')
}



exports.formulario = async (req, res) => {
    res.render('pages/formulario', { mensaje: null })
}



exports.registrar = async (req, res) => {
    try {

        // Validar nombre
        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(req.body.nombre)) {
            return res.render('pages/formulario', {
                mensaje: 'El nombre solo debe contener letras'
            });
        }

        // Validar email
        if (!/\S+@\S+\.\S+/.test(req.body.email)) {
            return res.render('pages/formulario', {
                mensaje: 'Correo electrónico inválido'
            });
        }

        // Validar teléfono
        if (!/^\d{10}$/.test(req.body.telefono)) {
            return res.render('pages/formulario', {
                mensaje: 'El teléfono debe tener 10 números'
            });
        }


        let clienteNuevo = {
            nombre: req.body.nombre,
            email: req.body.email,
            telefono: req.body.telefono,
        };

        const cliente = await Cliente.insertOne(clienteNuevo);

        if (cliente) {
            res.render('pages/formulario', {
                mensaje: 'Cliente registrado exitosamente'
            });
        }

    } catch (error) {
        console.log(error);
        res.render('pages/formulario', {
            mensaje: 'Error del servidor'
        });
    }
};

exports.consultar = async (req, res) => {
    try {
        const clientes = await Cliente.find();

        res.render('pages/clientes', { 
            clientes,
            mensaje: null
        });

    } catch (error) {
        res.render('pages/error', { error: error.message });
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
    try {
        const { nombre, email, telefono } = req.body;

        // Validar nombre
        if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nombre)) {
            const clientes = await Cliente.find();
            return res.render('pages/clientes', {
                clientes,
                mensaje: 'El nombre solo debe contener letras'
            });
        }

        // Validar email
        if (!/\S+@\S+\.\S+/.test(email)) {
            const clientes = await Cliente.find();
            return res.render('pages/clientes', {
                clientes,
                mensaje: 'Correo electrónico inválido'
            });
        }

        // Validar teléfono
        if (!/^\d{10}$/.test(telefono)) {
            const clientes = await Cliente.find();
            return res.render('pages/clientes', {
                clientes,
                mensaje: 'El teléfono debe tener 10 números'
            });
        }

        const datos = { nombre, email, telefono };

        await Cliente.findByIdAndUpdate(
            req.params.id,
            datos,
            { returnDocument: 'after' }
        );

        res.redirect('/clientesvista');

    } catch (error) {

        // Email duplicado
        if (error.code === 11000) {
            const clientes = await Cliente.find();
            return res.render('pages/clientes', {
                clientes,
                mensaje: 'Ese correo ya existe'
            });
        }

        const clientes = await Cliente.find();
        res.render('pages/clientes', {
            clientes,
            mensaje: 'Error del servidor'
        });
    }
};

exports.eliminar = async (req, res) => {
    try {
        await Cliente.findByIdAndDelete(req.params.id);

        res.redirect('/clientesvista');

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
