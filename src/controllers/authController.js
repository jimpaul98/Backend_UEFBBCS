const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { sendPasswordReset } = require('../utils/mailer');

// POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { correo } = req.body;
    if (!correo) return res.status(400).json({ message: 'El correo es obligatorio' });

    // 1) Verificar correo existente
    const user = await User.findOne({ correo });
    if (!user) {
      return res.status(404).json({ ok: false, message: 'El correo no está registrado' });
    }

    // 2) Generar token crudo y guardar HASH + expiración (1h)
    const rawToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordToken = tokenHash;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hora
    await user.save();

    // 3) Construir link (normalizando barras y http en localhost)
    const baseRaw = process.env.FRONTEND_BASE_URL || 'http://localhost:4200';
    const pathRaw = process.env.FRONTEND_RESET_PATH || '/auth/reset-password';
    const base = baseRaw
      .replace(/^https:\/\/localhost(:\d+)?/i, (m) => m.replace('https', 'http'))
      .replace(/\/+$/, '');             // sin slash al final
    const path = pathRaw.replace(/^\/+/, '/'); // con un solo slash inicial

    // modo PATH: /auth/reset-password/:token
    const resetLink = `${base}${path}/${rawToken}`;
    // Si prefieres QUERY: const resetLink = `${base}${path}?token=${rawToken}`;

    // 4) Enviar correo
    await sendPasswordReset(correo, resetLink);

    // (Opcional) log en dev
    console.log('Enlace de restablecimiento:', resetLink);

    return res.json({ ok: true, message: 'Enviamos el enlace de recuperación a tu correo.' });
  } catch (err) {
    console.error('forgotPassword error:', err);
    return res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
};

// (Opcional) POST /api/auth/validate-reset-token  { token }
exports.validateResetToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ message: 'Token requerido' });

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: Date.now() }
    }).select('_id');

    if (!user) return res.status(400).json({ ok: false, message: 'Token inválido o expirado' });

    return res.json({ ok: true, message: 'Token válido' });
  } catch (err) {
    console.error('validateResetToken error:', err);
    return res.status(500).json({ message: 'Error al validar token' });
  }
};

// POST /api/auth/reset-password   { token, password }
exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ message: 'Token y contraseña son obligatorios' });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
    }

    // 1) Hash del token recibido
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // 2) Buscar usuario por hash y no expirado
    const user = await User.findOne({
      resetPasswordToken: tokenHash,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    // 3) Hashear y guardar nueva contraseña
    const salt = await bcrypt.genSalt(10);
    user.clave = await bcrypt.hash(password, salt);

    // 4) Invalidar token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.json({ ok: true, message: 'Contraseña actualizada con éxito' });
  } catch (err) {
    console.error('resetPassword error:', err);
    return res.status(500).json({ message: 'No se pudo restablecer la contraseña' });
  }
};
