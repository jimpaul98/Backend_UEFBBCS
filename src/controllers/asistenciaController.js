const Asistencia = require('../models/Asistencia');

// Registrar asistencia
exports.registrarAsistencia = async (req, res) => {
  try {
    const { id_estudiante, id_clase, fecha, asistio } = req.body;

    const nuevaAsistencia = new Asistencia({ id_estudiante, id_clase, fecha, asistio });
    await nuevaAsistencia.save();

    res.status(201).json({ message: 'Asistencia registrada con éxito', nuevaAsistencia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar la asistencia' });
  }
};

