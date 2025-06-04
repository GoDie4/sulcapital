import express from "express";
import cors from "cors";
import path from "path";
const app = express();

// 1) Orígenes permitidos (solo tu dominio de producción)
const allowedOrigins = ["https://sulcapital.exportando.online"];

const corsOptions = {
  origin: allowedOrigins, // Usa el array de orígenes permitidos
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// 2) Aplica CORS a TODAS las rutas (incluyendo OPTIONS y POST/GET reales)
// Asegúrate de que el middleware CORS se aplique antes de tus rutas
app.use(cors(corsOptions));

// 3) Asegura que cualquier OPTIONS reciba los mismos headers CORS
// (Este app.options ya no es estrictamente necesario si el app.use(cors) lo maneja correctamente,
// pero lo mantengo con la misma configuración para consistencia si lo prefieres)
app.options("*", cors(corsOptions));

// 4) Ahora montas tus otros middlewares:
app.use("/public", express.static(path.resolve("public")));
app.use(express.json());

export default app;
