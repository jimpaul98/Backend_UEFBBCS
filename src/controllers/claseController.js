const Clase = require('../models/Clase');

// Obtener todas las clases
exports.obtenerClases = async (req, res) => {
  try {
    const clases = await Clase.find().populate('id_profesor').populate('estudiantes');
    res.json(clases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las clases' });
  }
};

// Obtener clase por ID
exports.obtenerClase = async (req, res) => {
  try {
    const clase = await Clase.findById(req.params.id).populate('id_profesor').populate('estudiantes');
    if (!clase) return res.status(404).json({ message: 'No existe la clase' });

    res.json(clase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la clase' });
  }
};

// Registrar clase
exports.registrarClase = async (req, res) => {
  try {
    const { grado, seccion, id_profesor, estudiantes } = req.body;

    const nuevaClase = new Clase({ grado, seccion, id_profesor, estudiantes });
    await nuevaClase.save();

    res.status(201).json({ message: 'Clase registrada con éxito', nuevaClase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar la clase' });
  }
};

// Actualizar clase
exports.actualizarClase = async (req, res) => {
  try {
    const { id } = req.params;
    const { grado, seccion, id_profesor, estudiantes } = req.body;

    const clase = await Clase.findById(id);
    if (!clase) return res.status(404).json({ message: 'No existe la clase' });

    clase.grado = grado || clase.grado;
    clase.seccion = seccion || clase.seccion;
    clase.id_profesor = id_profesor || clase.id_profesor;
    clase.estudiantes = estudiantes || clase.estudiantes;

    await clase.save();
    res.json({ message: 'Clase actualizada con éxito', clase });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la clase' });
  }
};

// Eliminar clase
exports.eliminarClase = async (req, res) => {
  try {
    const { id } = req.params;

    const clase = await Clase.findById(id);
    if (!clase) return res.status(404).json({ message: 'No existe la clase' });

    await Clase.findByIdAndDelete(id);
    res.json({ message: 'Clase eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la clase' });
  }
};
