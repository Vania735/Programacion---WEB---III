const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar productos con mensaje 
router.get('/', (req, res) => {
  const mensaje = req.query.mensaje;
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) throw err;
    res.render('index', { productos: results, mensaje });
  });
});

// Formulario crear
router.get('/crear', (req, res) => {
  res.render('crear');
});

// Guardar producto
router.post('/guardar', (req, res) => {
  const { nombre, precio, stock } = req.body;
  db.query('INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)', [nombre, precio, stock], (err) => {
    if (err) throw err;
    res.redirect('/?mensaje=Producto+creado+correctamente');
  });
});

// Formulario editar
router.get('/editar/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.render('editar', { producto: results[0] });
  });
});

// Actualizar producto
router.post('/actualizar/:id', (req, res) => {
  const id = req.params.id;
  const { nombre, precio, stock } = req.body;
  db.query('UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?', [nombre, precio, stock, id], (err) => {
    if (err) throw err;
    res.redirect('/?mensaje=Producto+actualizado+correctamente');
  });
});

// Eliminar producto
router.get('/eliminar/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.redirect('/?mensaje=Producto+eliminado+correctamente');
  });
});


  
module.exports = router;
