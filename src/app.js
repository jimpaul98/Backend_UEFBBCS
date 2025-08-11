
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

require('./database'); // Conexión a base de datos

app.use(cors());
app.use(express.json());

const rutas = require('./routes/routes');
app.use('/api', rutas); // todas las rutas empiezan con /api
app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
