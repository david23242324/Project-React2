const express = require("express");
const cors = require("cors");
const usuariosRoutes = require("./routes/usuarios");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas principales
// 👇 Esto hace que las rutas dentro de usuarios.js se monten en /api
app.use("/api", usuariosRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "🚀 API de Usuarios funcionando correctamente" });
});

// Servidor escuchando
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
