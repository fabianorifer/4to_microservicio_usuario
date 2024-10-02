const express = require('express');
const userRoutes = require('./routes/userRoutes'); // Importa las rutas de usuario
const authMiddleware = require('./middleware/authMiddleware'); // Importa el middleware de autenticación

const app = express();
const port = 3001;

app.use(express.json()); // Middleware para interpretar JSON

// Rutas públicas (no requieren autenticación)
app.use('/api/users', userRoutes);

// Ruta protegida (requiere autenticación con token)
app.use('/api/protected-route', authMiddleware, (req, res) => {
    res.json({ message: "Esta es una ruta protegida y accediste con un token válido." });
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Microservicio de usuarios escuchando en http://localhost:${port}`);
});
