const Padre = require('../models/Padre');

// Registrar padre
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
