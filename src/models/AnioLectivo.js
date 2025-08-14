const mongoose = require('mongoose');

// Esquema para Año Lectivo
const anioLectivoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },  // Ejemplo: "2025-2026"
  grado_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Grado' }]  // Relación con los grados asociados
});

// Crear y exportar el modelo
module.exports = mongoose.model('AnioLectivo', anioLectivoSchema);
