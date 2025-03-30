const readline = require('readline');
const mysql = require('mysql2/promise');
const dbConfig = require('./bd/config');
const { fetchBasicaProducts } = require('./bd/basica');
const { fetchPromesaProducts } = require('./bd/promesa');
const { fetchPoolProducts, pool } = require('./bd/agrupamiento');

async function getAllProducts() {
    console.log("\n===============================================================\n");

    console.log("\n🔹 Obteniendo productos...");

    console.log("\n---------------------------------------------------------------\n");

    const inicioTotal = performance.now();
    let basicaResults, promesasResults, poolResults;
    let tiempoBasica = 0, tiempoPromesa = 0, tiempoPooling = 0;

    try {
        // 📌 Obtener productos con conexión BÁSICA
        //console.log("\n🔸 Ejecutando consulta con conexión BÁSICA...");
        const inicioBasica = performance.now();
        basicaResults = await fetchBasicaProducts();
        tiempoBasica = performance.now() - inicioBasica;

        console.log("\n---------------------------------------------------------------\n");

        // 📌 Obtener productos con conexión PROMESA
        //console.log("\n🔸 Ejecutando consulta con conexión PROMESA...");
        const inicioPromesa = performance.now();
        promesasResults = await fetchPromesaProducts();
        tiempoPromesa = performance.now() - inicioPromesa;

        console.log("\n---------------------------------------------------------------\n");

        // 📌 Obtener productos con conexión POOLING
        //console.log("\n🔸 Ejecutando consulta con conexión POOLING...");
        const inicioPooling = performance.now();
        poolResults = await fetchPoolProducts();
        tiempoPooling = performance.now() - inicioPooling;

        console.log("\n---------------------------------------------------------------\n");

        // 📋 Resumen
        console.log("\n📋 Resumen de datos obtenidos:");
        console.log(`   🔹 Productos obtenidos desde BÁSICA: ${basicaResults.length}`);
        console.log(`   🔹 Productos obtenidos desde PROMESA: ${promesasResults.length}`);
        console.log(`   🔹 Productos obtenidos desde AGRUPAMIENTO: ${poolResults.length}`);

        console.log("\n---------------------------------------------------------------\n");

        // ⏱️ Tiempos de ejecución
        console.log("\n⏱️ Tiempos de ejecución:");
        console.log(`   🔹 Básica:  ${tiempoBasica.toFixed(3)} ms`);
        console.log(`   🔹 Promesa: ${tiempoPromesa.toFixed(3)} ms`);
        console.log(`   🔹 Pooling: ${tiempoPooling.toFixed(3)} ms`);
        console.log(`   ⏳ Tiempo total de ejecución: ${(performance.now() - inicioTotal).toFixed(3)} ms`);

    } catch (error) {
        console.error('❌ Error en la consulta:', error.message);
    } finally {
        await pool.end();
        console.log("\n---------------------------------------------------------------");
        console.log("\n🔒 AGRUPAMIENTO de conexiones cerrado correctamente.");
        console.log("\n===============================================================");
    }
}

// 📌 Función para agregar un nuevo producto
async function addProduct(nombre, apellidoP, apellidoM, ci, ocupacion) {
    console.log("\n===============================================================\n");
    console.log("\n📌 Agregando un nuevo producto...");

    try {
        const connection = await mysql.createConnection(dbConfig);
        const query = 'INSERT INTO productos (nombre, apellidoP, apellidoM, ci, ocupacion) VALUES (?, ?, ?, ?, ?)';
        const [result] = await connection.execute(query, [nombre, apellidoP, apellidoM, ci, ocupacion]);
        console.log(`\n✅ Producto agregado con ID: ${result.insertId}`);
        await connection.end();
    } catch (error) {
        console.error('\n❌ Error al agregar producto:', error.message);
    }

    console.log("\n===============================================================");
}

// 📌 Función para eliminar un producto
async function deleteProduct(id) {
    console.log("\n===============================================================");
    console.log(`\n📌 Eliminando producto con ID: ${id}`);

    try {
        const connection = await mysql.createConnection(dbConfig);
        const query = 'DELETE FROM productos WHERE ID = ?';
        const [result] = await connection.execute(query, [id]);

        if (result.affectedRows > 0) {
            console.log(`\n✅ Producto con ID ${id} eliminado correctamente.`);
        } else {
            console.log(`\n⚠️ No se encontró un producto con ID ${id}.`);
        }
        await connection.end();
    } catch (error) {
        console.error('\n❌ Error al eliminar producto:', error.message);
    }

    console.log("\n===============================================================");
}

// 📌 Interfaz de usuario en la terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 📌 Función para mostrar menú
function showMenu() {
    console.log("\n===============================================================");
    console.log("\n🔹 Selecciona una opción:");
    console.log("\n---------------------------------------------------------------");
    console.log("1️⃣ - Agregar un producto");
    console.log("2️⃣ - Eliminar un producto");
    console.log("3️⃣ - Ninguno (salir)");
    console.log("\n---------------------------------------------------------------");

    rl.question("\n👉 Ingresa una opción: ", async (option) => {
        console.log("\n---------------------------------------------------------------");

        if (option === '1') {
            rl.question("\n📌 Nombre de la Persona: ", (nombre) => {
                rl.question("📌 Apellido Paterno: ", (apellidoP) => {
                    rl.question("📌 Apellido Materno: ", (apellidoM) => {
                        rl.question("📌 CI de la Persona: ", (ci) => {
                            rl.question("📌 Ocupacion: ", async (ocupacion) => {
                                await addProduct(nombre, apellidoP, apellidoM, ci, ocupacion);
                                console.log("\n✅ Producto agregado correctamente.\n");
                                showMenu(); // Volver a mostrar el menú
                            });
                        });
                    });
                });
            });
        } else if (option === '2') {
            rl.question("\n📌 Ingresa el ID del producto a eliminar: ", async (id) => {
                await deleteProduct(parseInt(id));
                console.log("\n✅ Producto eliminado correctamente.\n");
                showMenu(); // Volver a mostrar el menú
            });
        } else if (option === '3') {
            console.log("\n✅ No se realizaron cambios. Saliendo...");
            console.log("\n===============================================================\n");
            rl.close();
        } else {
            console.log("\n❌ Opción no válida.");
            showMenu(); // Volver a mostrar el menú
        }
    });
}

// 📌 Ejecutar solo una vez
(async function () {
    await getAllProducts();
    showMenu();
})();
