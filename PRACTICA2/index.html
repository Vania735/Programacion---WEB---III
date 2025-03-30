/*
const express = require('express');
const connection = require('./bd/basica');
const conectarDB = require('./bd/promesa');
const pool = require('./bd/agrupamiento');

const app = express();
app.use(express.json());

const PORT = 3000; // Puerto definido directamente

// 🔍 Obtener todos los productos usando las 3 conexiones
app.get('/productos', async (req, res) => {
    let resultados = {};

    try {
        // Conexión Básica
        console.time('Conexión Básica');
        const [basicaResults] = await connection.promise().query('SELECT * FROM productos');
        console.timeEnd('Conexión Básica');
        resultados.basica = basicaResults;
    } catch (error) {
        resultados.basica = { error: error.message };
    }

    try {
        // Conexión con Promesas
        console.time('Conexión con Promesas');
        const conn = await conectarDB();
        const [promesasResults] = await conn.execute('SELECT * FROM productos');
        console.timeEnd('Conexión con Promesas');
        resultados.promesas = promesasResults;
        await conn.end();
    } catch (error) {
        resultados.promesas = { error: error.message };
    }

    try {
        // Conexión con Pooling
        console.time('Conexión con Pooling');
        const [poolResults] = await pool.promise().query('SELECT * FROM productos');
        console.timeEnd('Conexión con Pooling');
        resultados.pooling = poolResults;
    } catch (error) {
        resultados.pooling = { error: error.message };
    }

    res.json(resultados);
});

// ➕ Agregar un nuevo producto usando las 3 conexiones
app.post('/productos', async (req, res) => {
    const { nombre, precio, stock } = req.body;
    let resultados = {};

    try {
        // Conexión Básica
        console.time('Conexión Básica');
        await connection.promise().query('INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', [nombre, precio, stock]);
        console.timeEnd('Conexión Básica');
        resultados.basica = { message: 'Producto agregado (básico)' };
    } catch (error) {
        resultados.basica = { error: error.message };
    }

    try {
        // Conexión con Promesas
        console.time('Conexión con Promesas');
        const conn = await conectarDB();
        await conn.execute('INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', [nombre, precio, stock]);
        console.timeEnd('Conexión con Promesas');
        resultados.promesas = { message: 'Producto agregado (promesas)' };
        await conn.end();
    } catch (error) {
        resultados.promesas = { error: error.message };
    }

    try {
        // Conexión con Pooling
        console.time('Conexión con Pooling');
        await pool.promise().query('INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', [nombre, precio, stock]);
        console.timeEnd('Conexión con Pooling');
        resultados.pooling = { message: 'Producto agregado (pooling)' };
    } catch (error) {
        resultados.pooling = { error: error.message };
    }

    res.json(resultados);
});

// 🗑 Eliminar un producto usando las 3 conexiones
app.delete('/productos/:id', async (req, res) => {
    const productoId = req.params.id;
    let resultados = {};

    try {
        // Conexión Básica
        console.time('Conexión Básica');
        await connection.promise().query('DELETE FROM productos WHERE id = ?', [productoId]);
        console.timeEnd('Conexión Básica');
        resultados.basica = { message: 'Producto eliminado (básico)' };
    } catch (error) {
        resultados.basica = { error: error.message };
    }

    try {
        // Conexión con Promesas
        console.time('Conexión con Promesas');
        const conn = await conectarDB();
        await conn.execute('DELETE FROM productos WHERE id = ?', [productoId]);
        console.timeEnd('Conexión con Promesas');
        resultados.promesas = { message: 'Producto eliminado (promesas)' };
        await conn.end();
    } catch (error) {
        resultados.promesas = { error: error.message };
    }

    try {
        // Conexión con Pooling
        console.time('Conexión con Pooling');
        await pool.promise().query('DELETE FROM productos WHERE id = ?', [productoId]);
        console.timeEnd('Conexión con Pooling');
        resultados.pooling = { message: 'Producto eliminado (pooling)' };
    } catch (error) {
        resultados.pooling = { error: error.message };
    }

    res.json(resultados);
});

// 🚀 Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

*/