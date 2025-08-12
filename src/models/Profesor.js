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

// Registrar un nuevo profesor
exports.registrarProfesor = async (req, res) => {
  try {
    const { nombre, apellido, telefono, email, especialidad, materias } = req.body;

    const profesorExist = await Profesor.findOne({ email });
    if (profesorExist) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const nuevoProfesor = new Profesor({
      nombre,
      apellido,
      telefono,
      email,
      especialidad,
      materias
    });

    await nuevoProfesor.save();
    res.status(201).json({ message: 'Profesor registrado con éxito', nuevoProfesor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el profesor' });
  }
};
