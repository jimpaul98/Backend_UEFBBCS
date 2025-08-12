const mongoose = require('mongoose');

const MateriaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  id_profesor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profesor',
    required: true
  }
});

module.exports = mongoose.model('Materia', MateriaSchema);
