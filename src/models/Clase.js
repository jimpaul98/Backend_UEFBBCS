const mongoose = require('mongoose');

const ClaseSchema = mongoose.Schema({
  grado: {
    type: String,
    required: true
  },
  seccion: {
    type: String,
    required: true
  },
  id_profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor',
    required: true
  },
  estudiantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estudiante'
  }]
});

module.exports = mongoose.model('Clase', ClaseSchema);
