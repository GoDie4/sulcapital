import express from "express";
import cors from "cors";
import path from "path";
const app = express();

// 1) Orígenes permitidos (solo tu dominio de producción)
const allowedOrigins = [
  "https://sulcapital.exportando.online"
];

// 2) Aplica CORS a TODAS las rutas (incluyendo OPTIONS y POST/GET reales)
app.use(
  cors({
    origin: '*',   // <- aquí pasamos el array directamente
    credentials: true,         // <- para que devuelva Access-Control-Allow-Credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// 3) Asegura que cualquier OPTIONS reciba los mismos headers CORS
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// 4) Ahora montas tus otros middlewares:
app.use("/public", express.static(path.resolve("public")));
app.use(express.json());

export default app;
