// utils/mailer.js
const nodemailer = require('nodemailer');

function buildTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = port === 465; // true solo para 465
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

async function sendPasswordReset(to, link) {
  const transporter = buildTransport();

  // Verificación útil mientras pruebas (puedes quitarla en prod)
  await transporter.verify();

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const html = `
    <div style="font-family:system-ui,Segoe UI,Roboto,Arial;max-width:600px;margin:auto">
      <h2>Restablecer contraseña</h2>
      <p>Has solicitado restablecer tu contraseña. Usa el siguiente botón o copia el enlace.</p>
      <p style="margin:20px 0">
        <a href="${link}" style="background:#0d6efd;color:#fff;padding:12px 18px;border-radius:8px;text-decoration:none">
          Restablecer contraseña
        </a>
      </p>
      <p style="word-break:break-all"><b>Enlace:</b> ${link}</p>
      <p style="color:#555">Este enlace caduca en 1 hora. Si no fuiste tú, ignora este mensaje.</p>
    </div>
  `;

  await transporter.sendMail({
    from,
    to,
    subject: 'Restablecer contraseña',
    html,
  });
}

module.exports = { sendPasswordReset };
