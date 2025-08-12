const mongoose = require("mongoose");

const EstudianteSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  id_clase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clase", // Relación con la colección Clase
    required: true,
  },
  padre: {
    nombre: String,
    telefono: String,
    email: String,
  },
  calificaciones: [
    {
      id_materia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Materia", // Relación con la colección Materia
        required: true,
      },
      calificacion: {
        type: Number,
        required: true,
      },
      fecha: {
        type: Date,
        required: true,
      },
    },
  ],
  asistencia: [
    {
      id_clase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clase", // Relación con la colección Clase
        required: true,
      },
      fecha: {
        type: Date,
        required: true,
      },
      asistio: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Estudiante", EstudianteSchema);
