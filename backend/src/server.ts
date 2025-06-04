import express from "express";
import cors from "cors";
import path from "path";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:4000",
  "https://sulcapital.exportando.online",
  "https://www.sulcapital.exportando.online",
];

// 2) Aplica CORS a TODO el tráfico (preflight + peticiones reales)
app.use(
  cors({
    origin: (origin, callback) => {
      // Si no viene origin (p. ej. llamadas desde Postman), permitirlas.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS: origen no permitido"));
      }
    },
    credentials: true, // <=== muy importante para permitir cookies
  })
);

// 3) Asegúrate de manejar el preflight (OPTIONS) por separado, pero con la misma configuración
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/public", express.static(path.resolve("public")));

app.use(express.json());

export default app;
