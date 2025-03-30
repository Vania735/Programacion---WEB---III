const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'defensa',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

async function fetchPoolProducts() {
    console.log('✅ Conectado a la base de datos AGRUPAMIENTO');
    console.time("⏳ Tiempo de conexión POOLING");
    try {
        const [results] = await pool.query('SELECT * FROM productos');
        console.timeEnd("⏳ Tiempo de conexión POOLING");

        // 🔹 Formateamos la salida para que coincida con la imagen
        console.log("\n📦 Productos en la base de datos: [");
        results.forEach(producto => {
        console.log(`  { id: ${producto.id},     nombre: '${producto.nombre}',     apellidoP: ${producto.apellidoP},      apellidoM: ${producto.apellidoM},     ci: ${producto.ci},    ocupacion: ${producto.ocupacion} }`);        });
        console.log("]\n");


        console.log("🔌 Conexión AGRUPAMIENTO cerrada correctamente.");
        return results;
    } catch (error) {
        console.error('❌ Error en la conexión POOLING:', error.message);
        return [];
    }
}

// Exportar el pool para cerrar la conexión cuando se necesite
module.exports = { fetchPoolProducts, pool };

