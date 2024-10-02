const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerUser, findUserByEmail } = require('../models/userModel');

// Registro de usuario
async function register(req, res) {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await registerUser(name, email, hashedPassword);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
}

// Login de usuario
async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ userId: user.id }, 'miSecretoJWT', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
}

module.exports = { register, login };
