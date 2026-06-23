<<<<<<< HEAD
const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'] 
  },
  precio: { type: Number, required: [true, 'El precio es obligatorio'] },
  duracionMinutos: { type: Number, required: [true, 'La duración es obligatoria'] },
  categoria: { 
    type: String, 
    enum: ['corte', 'tintura', 'peinado', 'tratamiento', 'barberia', 'otros'],
    required: [true, 'La categoría es obligatoria'] } 

});

module.exports = mongoose.model('servicios', servicioSchema);
=======
const mongoose = require('mongoose');

const servicioSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'] 
  },
  precio: { type: Number, required: [true, 'El precio es obligatorio'] },
  duracionMinutos: { type: Number, required: [true, 'La duración es obligatoria'] },
  categoria: { 
    type: String, 
    enum: ['corte', 'tintura', 'peinado', 'tratamiento', 'barberia', 'otros'],
    required: [true, 'La categoría es obligatoria'] } 

});

module.exports = mongoose.model('servicios', servicioSchema);
>>>>>>> c65f9f9d3bf0795aaad9749c7a0f20efa30178b3
