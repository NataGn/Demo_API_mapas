const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Ruta para guardar polígono
app.post("/poligonos", async (req, res) => {
  try {
    console.log("Recibiendo POST /poligonos con body:", req.body);
    const { nombre, coordenadas } = req.body;

    if (!nombre || !coordenadas) {
      console.error("Error: faltan datos en la petición");
      return res.status(400).json({ error: "Faltan datos" });
    }

    // Verificamos si coordenadas es un array
    if (!Array.isArray(coordenadas)) {
      console.error("Error: coordenadas no es un array");
      return res.status(400).json({ error: "Formato de coordenadas inválido" });
    }

    const result = await pool.query(
      "INSERT INTO poligonos (nombre, coordenadas) VALUES ($1, $2) RETURNING *",
      [nombre, JSON.stringify(coordenadas)]
    );

    console.log("Polígono insertado en BD:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error guardando polígono:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para obtener todos los polígonos
app.get("/poligonos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM poligonos");
    res.json(result.rows);
  } catch (error) {
    console.error("Error obteniendo polígonos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
