const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Importar las rutas
const salasRoutes = require('./routes/salas');
const reservasRoutes = require('./routes/reservas');

// Usar las rutas en el servidor
app.use('/api/salas', salasRoutes);
app.use('/api/reservas', reservasRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
