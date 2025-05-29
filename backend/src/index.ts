import app from "./server";
import express from "express";
import prisma from "./config/database";
import { ENV } from "./config/config";
import cookieParser from "cookie-parser";

import userRoutes from "../src/routes/user.routes";
import authRoutes from "../src/routes/auth.routes";
import ciudadesRoutes from "../src/routes/ciudades.routes";

app.use(express.static("public"));

app.use(cookieParser());
prisma
  .$connect()
  .then(() => {
    console.log("✅ Conectado a la base de datos");
    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server corriendo en http://localhost:${ENV.PORT}`);
    });
  })
  .catch((error: any) => {
    console.error("❌ Error al conectar a la base de datos:", error);
    process.exit(1);
  });

app.use("/api", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/ciudades", ciudadesRoutes);
