const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => {
  const query = "SELECT * FROM usuarios ORDER BY id ASC";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener usuarios:", err);
      return res.status(500).json({
        error: "Error al obtener usuarios",
        details: err.message,
      });
    }
    res.json(results);
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM usuarios WHERE email = ? AND password = ?;";

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error al buscar usuario:", err);
      return res.status(500).json({
        error: "Error al obtener usuario",
        details: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Login correcto
    res.status(200).json({ mensaje: "Login exitoso", usuario: results[0] });
  });
});


router.post("/", (req, res) => {
  const { nombre, email, telefono } = req.body;

  const query =
    "INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?);";
  const valores = [nombre, email, telefono];

  db.query(query, valores, (err, results) => {
    if (err) {
      console.error("Error al insertar usuario:", err);
      return res.status(500).json({
        error: "Error al insertar usuario",
        details: err.message,
      });
    }
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", id: results.insertId });
  });
});

router.put("/", (req, res) => {
  const { id, nombre, email, telefono, fecha_registro } = req.body;

  const query =
    "UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, fecha_registro = ? WHERE id = ?;";
  const valores = [nombre, email, telefono, fecha_registro, id];

  db.query(query, valores, (err, results) => {
    if (err) {
      console.error("Error al actualizar usuario:", err);
      return res.status(500).json({
        error: "Error al actualizar usuario",
        details: err.message,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(202).json({ message: "Usuario actualizado exitosamente" });
  });
});

router.delete("/", (req, res) => {
  const { id } = req.body;

  const query = "DELETE FROM usuarios WHERE id=?";
  const valor = [id];

  db.query(query, valor, (err, results) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({
        error: "Error al eliminar usuario",
        details: err.message,
      });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(201).json(results);
  });
});

module.exports = router;
