
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
    required: [true, 'El teléfono es obligatorio'],
  }
}, { versionKey: false });

module.exports = mongoose.model('clientes', clienteSchema);