const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const tokenSinBearer = token.replace('Bearer ', '');
        const verified = jwt.verify(tokenSinBearer, process.env.JWT_SECRET || 'secretkey');
        req.user = verified;
        next(); // continúa con la siguiente función (el controlador)
    } catch (err) {
        return res.status(401).json({ message: 'Token inválido.' });
    }
}

module.exports = verifyToken;
