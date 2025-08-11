const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true }, 
    apellido: { type: String, required: true },
    cedula: { type: String, required: true, unique: true }, // Cédula
    telefono: { type: String, required: true }, // Teléfono
    direccion: { type: String, required: true }, // Dirección
    fechaNacimiento: { type: Date, required: true }, // Fecha de nacimiento
    rol: { type: String, enum: ['Administrador', 'Profesor'], required: true }, // Rol con valores definidos
    correo: { type: String, required: true, unique: true }, // Correo electrónico
    clave: { type: String, required: true },
    
      resetPasswordToken: String,        // hash del token
  resetPasswordExpires: Date // Clave
}, {
    timestamps: true // Para guardar createdAt y updatedAt
});

module.exports = mongoose.model('User', UserSchema);

