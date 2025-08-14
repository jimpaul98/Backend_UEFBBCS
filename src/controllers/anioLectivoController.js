const AnioLectivo = require('../models/AnioLectivo'); // Importa el modelo de Año Lectivo

// Obtener todos los años lectivos
exports.obtenerAnioLectivos = async (req, res) => {
  try {
    const anioLectivos = await AnioLectivo.find().populate('grado_ids');  // Poblamos los grados asociados
    res.json(anioLectivos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los años lectivos' });
  }
};

// Obtener un año lectivo por ID
exports.obtenerAnioLectivo = async (req, res) => {
  try {
    const anioLectivo = await AnioLectivo.findById(req.params.id).populate('grado_ids');
    if (!anioLectivo) return res.status(404).json({ message: 'No existe el año lectivo' });

    res.json(anioLectivo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el año lectivo' });
  }
};

// Registrar un nuevo año lectivo
exports.registrarAnioLectivo = async (req, res) => {
  try {
    const { nombre, grado_ids } = req.body;

    // Verificar si el año lectivo ya existe
    const anioExistente = await AnioLectivo.findOne({ nombre });
    if (anioExistente) return res.status(400).json({ message: 'El año lectivo ya existe' });

    const nuevoAnioLectivo = new AnioLectivo({ nombre, grado_ids });
    await nuevoAnioLectivo.save();

    res.status(201).json({ message: 'Año lectivo registrado con éxito', nuevoAnioLectivo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el año lectivo' });
  }
};

// Actualizar un año lectivo
exports.actualizarAnioLectivo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, grado_ids } = req.body;

    const anioLectivo = await AnioLectivo.findById(id);
    if (!anioLectivo) return res.status(404).json({ message: 'No existe el año lectivo' });

    anioLectivo.nombre = nombre || anioLectivo.nombre;
    anioLectivo.grado_ids = grado_ids || anioLectivo.grado_ids;

    await anioLectivo.save();
    res.json({ message: 'Año lectivo actualizado con éxito', anioLectivo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el año lectivo' });
  }
};

// Eliminar un año lectivo
exports.eliminarAnioLectivo = async (req, res) => {
  try {
    const { id } = req.params;

    const anioLectivo = await AnioLectivo.findById(id);
    if (!anioLectivo) return res.status(404).json({ message: 'No existe el año lectivo' });

    await AnioLectivo.findByIdAndDelete(id);
    res.json({ message: 'Año lectivo eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el año lectivo' });
  }
};
