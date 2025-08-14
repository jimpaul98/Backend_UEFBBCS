const express = require('express');
const router = express.Router();

// Controladores de Estudiantes, Profesores, Materias, Clases, Asistencia y Padres
const estudianteController = require('../controllers/estudianteController');
const profesorController = require('../controllers/profesorController');
const materiaController = require('../controllers/materiaController');
const gradoController = require('../controllers/gradoController');
const asistenciaController = require('../controllers/asistenciaController');
const padreController = require('../controllers/padreController');
const anioLectivoController = require('../controllers/anioLectivoController');

// Controlador de Usuarios y Autenticación
const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');

// Rutas de Usuarios
router.get('/usuarios', usuarioController.obtenerUsuarios);
router.get('/usuarios/:id', usuarioController.obtenerUsuario);
router.post('/usuarios', usuarioController.registrarUsuario);
router.post('/login', usuarioController.login);
router.put('/usuarios/:id', usuarioController.actualizarUsuario);
router.delete('/usuarios/:id', usuarioController.eliminarUsuario);

// Rutas de Estudiantes
router.get('/estudiantes', estudianteController.obtenerEstudiantes);  // Listar todos los estudiantes
router.get('/estudiantes/:id', estudianteController.obtenerEstudiante);  // Listar estudiante por ID
router.post('/estudiantes', estudianteController.registrarEstudiante);  // Registrar estudiante
router.put('/estudiantes/:id', estudianteController.actualizarEstudiante);  // Actualizar estudiante
router.delete('/estudiantes/:id', estudianteController.eliminarEstudiante);  // Eliminar estudiante

// Rutas de Profesores
router.get('/profesores', profesorController.obtenerProfesores);  // Listar todos los profesores
router.get('/profesores/:id', profesorController.obtenerProfesor);  // Listar profesor por ID
router.post('/profesores', profesorController.registrarProfesor);  // Registrar profesor
router.put('/profesores/:id', profesorController.actualizarProfesor);  // Actualizar profesor
router.delete('/profesores/:id', profesorController.eliminarProfesor);  // Eliminar profesor

// Rutas de Materias
router.get('/materias', materiaController.obtenerMaterias);  // Listar todas las materias
router.get('/materias/:id', materiaController.obtenerMateria);  // Listar materia por ID
router.post('/materias', materiaController.registrarMateria);  // Registrar materia
router.put('/materias/:id', materiaController.actualizarMateria);  // Actualizar materia
router.delete('/materias/:id', materiaController.eliminarMateria);  // Eliminar materia

// Rutas de Grados
router.get('/grados', gradoController.obtenerGrados);// Obtener todos los grados
router.get('/grados/:id', gradoController.obtenerGrado);// Obtener un grado por ID
router.post('/grados', gradoController.registrarGrado);// Registrar un grado
router.put('/grados/:id', gradoController.actualizarGrado);// Actualizar un grado
router.delete('/grados/:id', gradoController.eliminarGrado);// Eliminar un grado


// años lectivos
router.get('/anio-lectivos', anioLectivoController.obtenerAnioLectivos);// Obtener todos los años lectivos
router.get('/anio-lectivos/:id', anioLectivoController.obtenerAnioLectivo);// Obtener un año lectivo por ID
router.post('/anio-lectivos', anioLectivoController.registrarAnioLectivo);// Registrar un nuevo año lectivo
router.put('/anio-lectivos/:id', anioLectivoController.actualizarAnioLectivo);// Actualizar un año lectivo
router.delete('/anio-lectivos/:id', anioLectivoController.eliminarAnioLectivo);// Eliminar un año lectivo



// Rutas de Asistencia
router.post('/asistencia', asistenciaController.registrarAsistencia);  // Registrar asistencia

// Rutas de Padres
router.post('/padres', padreController.registrarPadre);  // Registrar padre

// Rutas de Autenticación y Recuperación de Contraseña
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;






