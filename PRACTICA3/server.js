const express = require("express");
const app = express();
const path = require("path");

// Configurar EJS como motor de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rutas para cada página
app.get("/", (req, res) => res.render("index"));
app.get("/principal", (req, res) => res.render("principal"));
app.get("/turnos", (req, res) => res.render("turnos"));
app.get("/registro", (req, res) => res.render("registro"));
app.get("/contactos", (req, res) => res.render("contactos"));

// Servir archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, "public")));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
