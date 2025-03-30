module.exports = {
    host: 'localhost',  // Dirección del servidor MySQL
    user: 'root',       // Usuario de MySQL (por defecto en XAMPP es 'root')
    password: '',       // Deja vacío si no configuraste una contraseña
    database: 'defensa', // Reemplaza con el nombre de tu BD
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};
