const Padre = require('../models/Padre');

// Obtener todos los padres
exports.obtenerPadres = async (req, res) => {
  try {
    const padres = await Padre.find().populate('id_estudiante');
    res.json(padres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los padres' });
  }
};

// Obtener padre por ID
exports.obtenerPadre = async (req, res) => {
  try {
    const padre = await Padre.findById(req.params.id).populate('id_estudiante');
    if (!padre) return res.status(404).json({ message: 'No existe el padre' });
    res.json(padre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el padre' });
  }
};

// Registrar un nuevo padre
exports.registrarPadre = async (req, res) => {
  try {
    const { nombre, telefono, email, id_estudiante } = req.body;
    const nuevoPadre = new Padre({ nombre, telefono, email, id_estudiante });
    await nuevoPadre.save();
    res.status(201).json({ message: 'Padre registrado con éxito', nuevoPadre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el padre' });
  }
};

// Eliminar padre
exports.eliminarPadre = async (req, res) => {
  try {
    const { id } = req.params;

    const padre = await Padre.findById(id);
    if (!padre) return res.status(404).json({ message: 'No existe el padre' });

    await Padre.findByIdAndDelete(id);
    res.json({ message: 'Padre eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el padre' });
  }
};
