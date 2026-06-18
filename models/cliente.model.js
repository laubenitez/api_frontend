const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, 
    required: [true, 'El nombre es obligatorio'] },
  email: { 
    type: String, 
    required: [true, 'El email es obligatorio'], 
    unique: true 
  },
  telefono: { 
    type: String,
    minLength: [10, 'El teléfono debe tener al menos 10 dígitos'],
    maxLength: [15, 'El teléfono no puede tener más de 15 dígitos']
  }
}, { versionKey: false });

module.exports = mongoose.model('clientes', clienteSchema);