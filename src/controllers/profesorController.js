const Profesor = require('../models/Profesor');

// Obtener todos los profesores
exports.obtenerProfesores = async (req, res) => {
  try {
    const profesores = await Profesor.find().populate('materias');
    res.json(profesores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los profesores' });
  }
};

// Obtener profesor por ID
exports.obtenerProfesor = async (req, res) => {
  try {
    const profesor = await Profesor.findById(req.params.id).populate('materias');
    if (!profesor) return res.status(404).json({ message: 'No existe el profesor' });

    res.json(profesor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el profesor' });
  }
};

// Registrar profesor
exports.registrarProfesor = async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, especialidad, materias } = req.body;

    const profesorExist = await Profesor.findOne({ email });
    if (profesorExist) return res.status(400).json({ message: 'El correo ya está registrado' });

    const nuevoProfesor = new Profesor({ nombre, apellido, telefono, email, especialidad, materias });
    await nuevoProfesor.save();

    res.status(201).json({ message: 'Profesor registrado con éxito', nuevoProfesor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el profesor' });
  }
};

// Actualizar profesor
exports.actualizarProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, telefono, email, especialidad, materias } = req.body;

    const profesor = await Profesor.findById(id);
    if (!profesor) return res.status(404).json({ message: 'No existe el profesor' });

    profesor.nombre = nombre || profesor.nombre;
    profesor.apellido = apellido || profesor.apellido;
    profesor.telefono = telefono || profesor.telefono;
    profesor.email = email || profesor.email;
    profesor.especialidad = especialidad || profesor.especialidad;
    profesor.materias = materias || profesor.materias;

    await profesor.save();
    res.json({ message: 'Profesor actualizado con éxito', profesor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el profesor' });
  }
};

// Eliminar profesor
exports.eliminarProfesor = async (req, res) => {
  try {
    const { id } = req.params;

    const profesor = await Profesor.findById(id);
    if (!profesor) return res.status(404).json({ message: 'No existe el profesor' });

    await Profesor.findByIdAndDelete(id);
    res.json({ message: 'Profesor eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el profesor' });
  }
};
