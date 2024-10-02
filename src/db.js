const { Pool } = require('pg');

const pool = new Pool({
    user: 'root',
    host: '44.212.238.5',
    database: 'usuarios_db',
    password: 'utec',
    port: 8006,  // Cambia si es necesario
});

module.exports = pool;
