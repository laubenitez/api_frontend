
const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, 
    required: [true, 'El nombre es obligatorio'] },
    match: [/^[a-zA-Z\s]+$/, 'El nombre solo puede contener letras y espacios'],
  email: { 
    type: String, 
    required: [true, 'El email es obligatorio'], 
    unique: true 
  },
  telefono: { 
    type: String,
    required: [true, 'El teléfono es obligatorio'],
    match: [/^\d{10,15}$/, 'El teléfono solo puede contener dígitos y tener entre 10 y 15 caracteres']
  }
}, { versionKey: false });

module.exports = mongoose.model('clientes', clienteSchema);