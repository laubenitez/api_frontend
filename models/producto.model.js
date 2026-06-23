<<<<<<< HEAD
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'] 
  },
  precio: { type: Number, required: [true, 'El precio es obligatorio'] },
  stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('productos', productoSchema);
=======
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'] 
  },
  precio: { type: Number, required: [true, 'El precio es obligatorio'] },
  stock: { type: Number, default: 0 }
});

module.exports = mongoose.model('productos', productoSchema);
>>>>>>> c65f9f9d3bf0795aaad9749c7a0f20efa30178b3
