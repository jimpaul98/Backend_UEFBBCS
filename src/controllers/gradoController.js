const Grado = require('../models/Grado');  // Importa el modelo de Grado

// Obtener todos los grados
exports.obtenerGrados = async (req, res) => {
  try {
    const grados = await Grado.find().populate('profesor_id').populate('materia_ids').populate('estudiantes_ids');
    res.json(grados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los grados' });
  }
};

// Obtener grado por ID
exports.obtenerGrado = async (req, res) => {
  try {
    const grado = await Grado.findById(req.params.id)
      .populate('profesor_id')
      .populate('materia_ids')
      .populate('estudiantes_ids');

    if (!grado) return res.status(404).json({ message: 'No existe el grado' });

    res.json(grado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el grado' });
  }
};

// Registrar un nuevo grado
exports.registrarGrado = async (req, res) => {
  try {
    const { nombre, profesor_id, materia_ids, estudiantes_ids, horario } = req.body;

    const nuevoGrado = new Grado({
      nombre,
      profesor_id,
      materia_ids,
      estudiantes_ids,
      horario
    });

    await nuevoGrado.save();
    res.status(201).json({ message: 'Grado registrado con éxito', nuevoGrado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el grado' });
  }
};

// Actualizar un grado
exports.actualizarGrado = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, profesor_id, materia_ids, estudiantes_ids, horario } = req.body;

    const grado = await Grado.findById(id);
    if (!grado) return res.status(404).json({ message: 'No existe el grado' });

    grado.nombre = nombre || grado.nombre;
    grado.profesor_id = profesor_id || grado.profesor_id;
    grado.materia_ids = materia_ids || grado.materia_ids;
    grado.estudiantes_ids = estudiantes_ids || grado.estudiantes_ids;
    grado.horario = horario || grado.horario;

    await grado.save();
    res.json({ message: 'Grado actualizado con éxito', grado });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el grado' });
  }
};

// Eliminar un grado
exports.eliminarGrado = async (req, res) => {
  try {
    const { id } = req.params;

    const grado = await Grado.findById(id);
    if (!grado) return res.status(404).json({ message: 'No existe el grado' });

    await Grado.findByIdAndDelete(id);
    res.json({ message: 'Grado eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el grado' });
  }
};
