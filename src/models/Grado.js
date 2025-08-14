const mongoose = require('mongoose');

// Esquema para el horario de clases
const horarioSchema = new mongoose.Schema({
  lunes: { type: String, required: false },
  martes: { type: String, required: false },
  miercoles: { type: String, required: false },
  jueves: { type: String, required: false },
  viernes: { type: String, required: false },
  sabado: { type: String, required: false },
  domingo: { type: String, required: false }
});

// Esquema para el Grado
const gradoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },  // Nombre del grado (Ej. "1ro A", "2do B")
  profesor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profesor', required: true },  // Profesor asignado al grado
  materia_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Materia' }],  // Materias asociadas al grado
  estudiantes_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Estudiante' }],  // Estudiantes asignados
  horario: { type: horarioSchema, required: true }  // Horario del grado
});

// Crear y exportar el modelo
module.exports = mongoose.model('Grado', gradoSchema);

