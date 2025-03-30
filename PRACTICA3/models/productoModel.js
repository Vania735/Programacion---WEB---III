const db = require('../db');

const ProductoModel = {
  obtenerTodos: (callback) => {
    db.query('SELECT * FROM productos', callback);
  },

  crear: (nombre, precio, stock, callback) => {
    db.query(
      'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
      [nombre, precio, stock],
      callback
    );
  },

  actualizar: (id, nombre, precio, stock, callback) => {
    db.query(
      'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
      [nombre, precio, stock, id],
      callback
    );
  },

  eliminar: (id, callback) => {
    db.query('DELETE FROM productos WHERE id = ?', [id], callback);
  }
};

module.exports = ProductoModel;
