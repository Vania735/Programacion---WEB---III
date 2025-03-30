const mysql = require('mysql2/promise');

async function fetchPromesaProducts() {
    console.time("⏳ Tiempo de conexión PROMESA");
    let connection;
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'defensa'
        });

        console.log('✅ Conectado a la base de datos PROMESA');

        const [results] = await connection.execute('SELECT * FROM productos');
        console.timeEnd("⏳ Tiempo de conexión PROMESA");

        // 🔹 Formateamos la salida para que coincida con la imagen
        console.log("\n📦 Productos en la base de datos: [");
        results.forEach(producto => {
        console.log(`  { id: ${producto.id},     nombre: '${producto.nombre}',     apellidoP: ${producto.apellidoP},      apellidoM: ${producto.apellidoM},     ci: ${producto.ci},    ocupacion: ${producto.ocupacion} },`);
        });
        console.log("]\n");

        return results;
    } catch (error) {
        console.error('❌ Error en la conexión PROMESA:', error.message);
        return [];
    } finally {
        if (connection) {
            await connection.end();
            console.log("🔌 Conexión PROMESA cerrada correctamente.");
        }
    }
}

module.exports = { fetchPromesaProducts };
