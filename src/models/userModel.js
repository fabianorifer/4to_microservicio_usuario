const pool = require('../db');

// Función para registrar usuario
async function registerUser(name, email, password) {
    const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, password]
    );
    return result.rows[0];
}

// Función para buscar usuario por email
async function findUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}

module.exports = { registerUser, findUserByEmail };
