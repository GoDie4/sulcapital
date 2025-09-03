"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
    try {
        // Registrar Roles
        await registrarRoles();
        // Registrar Administrador
        await registrarAdministrador();
        console.log("Seed data inserted successfully!");
    }
    catch (error) {
        console.error("Error during seed:", error);
        process.exit(1);
    }
    finally {
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
//# sourceMappingURL=seed.js.map