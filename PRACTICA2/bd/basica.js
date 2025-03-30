const mysql = require('mysql2/promise');

async function fetchBasicaProducts() {
    console.time("⏳ Tiempo de conexión BÁSICA");
    let connection;
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'defensa'
        });

        console.log('✅ Conectado a la base de datos BÁSICA');

        const [results] = await connection.execute('SELECT * FROM productos');
        console.timeEnd("⏳ Tiempo de conexión BÁSICA");

        // 🔹 Formateamos los datos para que coincidan con la imagen
        console.log("\n📦 Productos en la base de datos: [");
        results.forEach(producto => {
            console.log(`  { id: ${producto.id},     nombre: '${producto.nombre}',     apellidoP: ${producto.apellidoP},     apellidoM: ${producto.apellidoM},   ci: ${producto.ci},  ocupacion: ${producto.ocupacion}            },`);
        });
        console.log("]\n");

        return results;
    } catch (error) {
        console.error('❌ Error en la conexión BÁSICA:', error.message);
        return [];
    } finally {
        if (connection) await connection.end();
        console.log("🔌 Conexión BÁSICA cerrada correctamente.");

        //console.log("--------------------------------------------------------------------------");
    }
    
}

module.exports = { fetchBasicaProducts };
