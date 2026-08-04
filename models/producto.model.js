const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  imagen: {
    type: String,
    required: [true, 'La imagen es obligatoria'],
  },
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'] 
  },
  precio: { type: Number, required: [true, 'El precio es obligatorio'] },
  stock: { type: Number, default: 0 },
  
});

module.exports = mongoose.model('productos', productoSchema);

