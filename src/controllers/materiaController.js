const Materia = require('../models/Materia');

// Obtener todas las materias
exports.obtenerMaterias = async (req, res) => {
  try {
    const materias = await Materia.find().populate('id_profesor');
    res.json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las materias' });
  }
};

// Obtener materia por ID
exports.obtenerMateria = async (req, res) => {
  try {
    const materia = await Materia.findById(req.params.id).populate('id_profesor');
    if (!materia) return res.status(404).json({ message: 'No existe la materia' });

    res.json(materia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la materia' });
  }
};

// Registrar materia
exports.registrarMateria = async (req, res) => {
  try {
    const { nombre, descripcion, id_profesor } = req.body;

    const nuevaMateria = new Materia({ nombre, descripcion, id_profesor });
    await nuevaMateria.save();

    res.status(201).json({ message: 'Materia registrada con éxito', nuevaMateria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar la materia' });
  }
};

// Actualizar materia
exports.actualizarMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, id_profesor } = req.body;

    const materia = await Materia.findById(id);
    if (!materia) return res.status(404).json({ message: 'No existe la materia' });

    materia.nombre = nombre || materia.nombre;
    materia.descripcion = descripcion || materia.descripcion;
    materia.id_profesor = id_profesor || materia.id_profesor;

    await materia.save();
    res.json({ message: 'Materia actualizada con éxito', materia });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la materia' });
  }
};

// Eliminar materia
exports.eliminarMateria = async (req, res) => {
  try {
    const { id } = req.params;

    const materia = await Materia.findById(id);
    if (!materia) return res.status(404).json({ message: 'No existe la materia' });

    await Materia.findByIdAndDelete(id);
    res.json({ message: 'Materia eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la materia' });
  }
};
