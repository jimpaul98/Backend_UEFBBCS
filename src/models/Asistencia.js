const mongoose = require('mongoose');

const AsistenciaSchema = mongoose.Schema({
  id_estudiante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Estudiante',
    required: true
  },
  id_clase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Clase',
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  asistio: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Asistencia', AsistenciaSchema);
