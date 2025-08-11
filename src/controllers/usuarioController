const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({}, '-clave');

    const usuariosFormateados = usuarios.map(u => ({
      id: u._id.toString(),
      nombre: u.nombre,
      apellido: u.apellido,
      cedula: u.cedula,
      telefono: u.telefono,
      direccion: u.direccion,
      fechaNacimiento: u.fechaNacimiento,
      rol: u.rol,
      correo: u.correo
    }));

    res.json(usuariosFormateados);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

// Obtener usuario por ID
exports.obtenerUsuario = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-clave');
    if (!user) return res.status(404).json({ message: 'No existe el usuario' });

    const usuarioFormateado = {
      id: user._id.toString(),
      nombre: user.nombre,
      apellido: user.apellido,
      cedula: user.cedula,
      telefono: user.telefono,
      direccion: user.direccion,
      fechaNacimiento: user.fechaNacimiento,
      rol: user.rol,
      correo: user.correo
    };

    res.json(usuarioFormateado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

// Registrar usuario
exports.registrarUsuario = async (req, res) => {
  console.log('Datos recibidos desde el frontend:', req.body);

  try {
    const {
      nombre,
      apellido,
      cedula,
      telefono,
      direccion,
      fechaNacimiento,
      rol,
      correo,
      clave
    } = req.body;

    if (!nombre || !apellido || !cedula || !telefono || !direccion || !fechaNacimiento || !rol || !correo || !clave) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const userExist = await User.findOne({ correo });
    if (userExist) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const cedulaExist = await User.findOne({ cedula });
    if (cedulaExist) {
      return res.status(400).json({ message: 'La cédula ya está registrada' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedClave = await bcrypt.hash(clave, salt);

    const newUser = new User({
      nombre,
      apellido,
      cedula,
      telefono,
      direccion,
      fechaNacimiento,
      rol,
      correo,
      clave: hashedClave
    });

    await newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, rol: newUser.rol },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      token,
      user: {
        id: newUser._id.toString(),
        nombre: newUser.nombre,
        correo: newUser.correo,
        rol: newUser.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
};

// Login usuario
exports.login = async (req, res) => {
  try {
    const { correo, clave } = req.body;

    const user = await User.findOne({ correo });
    if (!user) return res.status(401).json({ message: "Correo incorrecto" });

    const validPassword = await bcrypt.compare(clave, user.clave);
    if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { _id: user._id, rol: user.rol },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id.toString(),
        nombre: user.nombre,
        rol: user.rol,
        correo: user.correo
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};

// Actualizar usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      apellido,
      cedula,
      telefono,
      direccion,
      fechaNacimiento,
      rol,
      correo
    } = req.body;

    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ msg: 'No existe el usuario' });
    }

    usuario.nombre  = nombre;
    usuario.apellido  = apellido;
    usuario.cedula  = cedula;
    usuario.telefono  = telefono;
    usuario.direccion  = direccion;
    usuario.fechaNacimiento  = fechaNacimiento;
    usuario.rol  = rol;
    usuario.correo  = correo;

    const usuarioActualizado = await User.findByIdAndUpdate(id, usuario, { new: true });

    res.json({ 
      msg: 'Usuario actualizado con éxito', 
      usuario: {
        id: usuarioActualizado._id.toString(),
        nombre: usuarioActualizado.nombre,
        apellido: usuarioActualizado.apellido,
        cedula: usuarioActualizado.cedula,
        telefono: usuarioActualizado.telefono,
        direccion: usuarioActualizado.direccion,
        fechaNacimiento: usuarioActualizado.fechaNacimiento,
        rol: usuarioActualizado.rol,
        correo: usuarioActualizado.correo
      }
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ msg: 'Error al actualizar usuario' });
  }
};

// Eliminar usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await User.findById(id);
    if (!usuario) {
      return res.status(404).json({ msg: 'No existe el usuario' });
    }

    await User.findByIdAndDelete(id);

    res.json({ msg: 'Usuario eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ msg: 'Error al eliminar el usuario' });
  }
};
