import app from "./server";
import express from "express";
import prisma from "./config/database";
import { ENV } from "./config/config";
import cookieParser from "cookie-parser";

import userRoutes from "../src/routes/user.routes";
import authRoutes from "../src/routes/auth.routes";
import ciudadesRoutes from "../src/routes/ciudades.routes";
import tipoPropiedadesRoutes from "../src/routes/tipoPropiedad.routes";
import propiedadesRoutes from "../src/routes/propiedades.routes";
import favoritosRoutes from "../src/routes/favoritos.routes";
import vistosRoutes from "../src/routes/vistos.routes";
import contactoRoutes from "../src/routes/contacto.routes";
import bannersRoutes from "../src/routes/banners.routes";

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
app.use("/api/banners", bannersRoutes);
app.use("/api/tipo_propiedades", tipoPropiedadesRoutes);
app.use("/api/propiedades", propiedadesRoutes);
app.use("/api/favoritos", favoritosRoutes);
app.use("/api/vistos", vistosRoutes);
app.use("/api/contacto", contactoRoutes);

// 🔴 Manejar desconexión limpia al cerrar el proceso
process.on("SIGINT", async () => {
  console.log("\n🧹 Cerrando conexión a la base de datos...");
  await prisma.$disconnect();
  console.log("✅ Prisma desconectado. Adiós!");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🧹 Cerrando conexión a la base de datos...");
  await prisma.$disconnect();
  console.log("✅ Prisma desconectado. Adiós!");
  process.exit(0);
});
