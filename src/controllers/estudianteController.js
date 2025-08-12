const Estudiante = require('../models/Estudiante');

// Obtener todos los estudiantes
exports.obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find().populate('id_clase').populate('calificaciones.id_materia').populate('asistencia.id_clase');
    res.json(estudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los estudiantes' });
  }
};

// Obtener estudiante por ID
exports.obtenerEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id).populate('id_clase').populate('calificaciones.id_materia').populate('asistencia.id_clase');
    if (!estudiante) return res.status(404).json({ message: 'No existe el estudiante' });

    res.json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el estudiante' });
  }
};

// Registrar estudiante
exports.registrarEstudiante = async (req, res) => {
  try {
    const { nombre, apellido, fechaNacimiento, direccion, telefono, email, id_clase, padre, calificaciones, asistencia } = req.body;

    const nuevoEstudiante = new Estudiante({ nombre, apellido, fechaNacimiento, direccion, telefono, email, id_clase, padre, calificaciones, asistencia });
    await nuevoEstudiante.save();

    res.status(201).json({ message: 'Estudiante registrado con éxito', nuevoEstudiante });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el estudiante' });
  }
};

// Actualizar estudiante
exports.actualizarEstudiante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, fechaNacimiento, direccion, telefono, email, id_clase, padre, calificaciones, asistencia } = req.body;

    const estudiante = await Estudiante.findById(id);
    if (!estudiante) return res.status(404).json({ message: 'No existe el estudiante' });

    estudiante.nombre = nombre || estudiante.nombre;
    estudiante.apellido = apellido || estudiante.apellido;
    estudiante.fechaNacimiento = fechaNacimiento || estudiante.fechaNacimiento;
    estudiante.direccion = direccion || estudiante.direccion;
    estudiante.telefono = telefono || estudiante.telefono;
    estudiante.email = email || estudiante.email;
    estudiante.id_clase = id_clase || estudiante.id_clase;
    estudiante.padre = padre || estudiante.padre;
    estudiante.calificaciones = calificaciones || estudiante.calificaciones;
    estudiante.asistencia = asistencia || estudiante.asistencia;

    await estudiante.save();
    res.json({ message: 'Estudiante actualizado con éxito', estudiante });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el estudiante' });
  }
};

// Eliminar estudiante
exports.eliminarEstudiante = async (req, res) => {
  try {
    const { id } = req.params;

    const estudiante = await Estudiante.findById(id);
    if (!estudiante) return res.status(404).json({ message: 'No existe el estudiante' });

    await Estudiante.findByIdAndDelete(id);
    res.json({ message: 'Estudiante eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el estudiante' });
  }
};
