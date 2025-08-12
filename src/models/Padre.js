const mongoose = require('mongoose');

const PadreSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  id_estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estudiante',
    required: true
  }
});

module.exports = mongoose.model('Padre', PadreSchema);
