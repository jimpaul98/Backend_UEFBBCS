const Asistencia = require('../models/Asistencia');

// Obtener todas las asistencias
exports.obtenerAsistencias = async (req, res) => {
  try {
    const asistencias = await Asistencia.find().populate('id_estudiante').populate('id_clase');
    res.json(asistencias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las asistencias' });
  }
};

// Obtener asistencia por ID
exports.obtenerAsistencia = async (req, res) => {
  try {
    const asistencia = await Asistencia.findById(req.params.id).populate('id_estudiante').populate('id_clase');
    if (!asistencia) return res.status(404).json({ message: 'No existe la asistencia' });
    res.json(asistencia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la asistencia' });
  }
};

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

// Eliminar asistencia
exports.eliminarAsistencia = async (req, res) => {
  try {
    const { id } = req.params;

    const asistencia = await Asistencia.findById(id);
    if (!asistencia) return res.status(404).json({ message: 'No existe la asistencia' });

    await Asistencia.findByIdAndDelete(id);
    res.json({ message: 'Asistencia eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la asistencia' });
  }
};
