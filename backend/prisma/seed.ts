import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    // Registrar Roles
    await registrarRoles();

    // Registrar Administrador
    await registrarAdministrador();

    console.log("Seed data inserted successfully!");
  } catch (error) {
    console.error("Error during seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

async function registrarRoles() {
  const roles = ["administrador", "anunciante", "cliente"];

  for (const nombre of roles) {
    const rolExiste = await prisma.rol.findUnique({
      where: { nombre },
    });

    if (!rolExiste) {
      await prisma.rol.create({
        data: { nombre },
      });

      console.log(`Rol '${nombre}' registrado.`);
    }
  }
}

async function registrarAdministrador() {
  const hashPassword = await bcrypt.hash("Sulcapital@2025", 10);

  await prisma.usuario.create({
    data: {
      rol_id: 1, // Asumiendo que 1 es el ID del rol administrador
      nombres: "Sulcapital",
      apellidos: "Sac",
      tipo_documento: "DNI",
      documento: "12345678",
      email: "administrador@sulcapital.com",
      celular: "987654321",
      password: hashPassword,
      activo: true,
    },
  });

  console.log("Administrador creado con los campos esenciales.");
}

registrarAdministrador();

main();
