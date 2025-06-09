"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecientesByUser = exports.registrarReciente = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const registrarReciente = async (req, res) => {
    const userId = req.user?.id;
    const { propiedadId } = req.body;
    if (!userId || !propiedadId) {
        return res.status(400).json({ message: "Faltan datos necesarios" });
    }
    try {
        await prisma.recientementeVisto.upsert({
            where: {
                propiedadId_userId: {
                    propiedadId,
                    userId,
                },
            },
            update: {
                vistaEn: new Date(),
            },
            create: {
                propiedadId,
                userId,
            },
        });
        return res
            .status(200)
            .json({ message: "Propiedad registrada como vista recientemente" });
    }
    catch (error) {
        console.error("Error al registrar recientemente visto:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.registrarReciente = registrarReciente;
const getRecientesByUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const search = req.query.search?.trim() || "";
    const skip = (page - 1) * limit;
    const searchLower = search.toLowerCase();
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Usuario no autenticado" });
    }
    const whereConditions = {
        RecientementeVisto: {
            some: {
                userId: user.id,
            },
        },
    };
    if (searchLower) {
        whereConditions.OR = [
            { titulo: { contains: searchLower } },
            { descripcionLarga: { contains: searchLower } },
            { descripcionCorta: { contains: searchLower } },
            { direccion: { contains: searchLower } },
        ];
    }
    try {
        const [propiedades, total] = await Promise.all([
            prisma.propiedad.findMany({
                skip,
                take: limit,
                where: whereConditions,
                include: {
                    tipoPropiedad: { select: { nombre: true, id: true } },
                    ciudad: true,
                    imagenes: {
                        select: { id: true, url: true },
                        orderBy: { id: "asc" },
                    },
                    fondoPortada: {
                        select: { id: true, url: true },
                        orderBy: { id: "asc" },
                    },
                },
                orderBy: { createdAt: "desc" },
            }),
            prisma.propiedad.count({
                where: whereConditions,
            }),
        ]);
        // Añadir campo para identificar que es reciente
        const propiedadesConReciente = propiedades.map((prop) => ({
            ...prop,
            esReciente: true,
        }));
        res.json({
            data: propiedadesConReciente,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener recientes" });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getRecientesByUser = getRecientesByUser;
//# sourceMappingURL=vistos.controller.js.map