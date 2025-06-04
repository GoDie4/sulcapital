import express from "express";
import cors from "cors";
import path from "path";

const app = express();
// 1) Orígenes permitidos (solo producción: tu dominio)
const allowedOrigins = [
    "https://sulcapital.exportando.online",
  ];
  
  // 2) Aplica CORS a TODAS las rutas (incluido el preflight)
  app.use(
    cors({
      origin: (origin, callback) => {
        // Si no viene origin (Postman, tests) o si está en la lista, permitimos;
        // en producción el navegador sí enviará el origin correcto.
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("CORS: origen no permitido"));
        }
      },
      credentials: true, // <— muy importante para que el navegador acepte las cookies
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  
  // 3) Opcional—pero recomendable—forzar que cualquier OPTIONS reciba los mismos headers:
  app.options(
    "*",
    cors({
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  
app.use("/public", express.static(path.resolve("public")));

app.use(express.json());

export default app;
