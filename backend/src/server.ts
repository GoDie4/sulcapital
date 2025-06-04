import express from "express";
import cors from "cors";
import path from "path";

const app = express();

// 1) Permitir cualquier origen, pero manteniendo credentials (cookies)
app.use(
  cors({
    origin: (origin, callback) => {
      // Con callback(null, true) siempre permites el origen que venga,
      // incluso si origin === undefined (por Postman, etc.).
      callback(null, true);
    },
    credentials: true, // para que el navegador acepte cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 2) Asegurar que cualquier OPTIONS reciba los mismos headers
app.options(
  "*",
  cors({
    origin: true, // true equivale a “permitir siempre”
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 5) Middleware adicional para debugging CORS
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  console.log("Request Method:", req.method);
  console.log("Request Headers:", req.headers);
  next();
});

// 4) Ahora montas tus otros middlewares:
app.use("/public", express.static(path.resolve("public")));
app.use(express.json());

export default app;
