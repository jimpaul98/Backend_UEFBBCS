const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController')


// ===============================
// 🔹 Rutas de Usuarios
// ===============================

// Obtener todos los usuarios
router.get('/usuarios', usuarioController.obtenerUsuarios);

// Obtener un usuario por ID
router.get('/usuarios/:id', usuarioController.obtenerUsuario);

// Registrar usuario
router.post('/usuarios', usuarioController.registrarUsuario);

// Login de usuario
router.post('/login', usuarioController.login);

// Actualizar usuario
router.put('/usuarios/:id', usuarioController.actualizarUsuario);

// Eliminar usuario
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);

router.post('/forgot-password',authController.forgotPassword);

router.post('/reset-password',authController.resetPassword)

module.exports = router;






