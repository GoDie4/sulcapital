"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCiudad = exports.updateCiudad = exports.createCiudad = exports.getCiudades = void 0;
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const getCiudades = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const search = req.query.search?.trim() || "";
    const skip = (page - 1) * limit;
    const searchLower = search.toLowerCase();
    const whereConditions = {};
    if (searchLower) {
        whereConditions.OR = [
            { nombre: { contains: searchLower } },
            { descripcion: { contains: searchLower } },
        ];
    }
    try {
        const [ciudades, total] = await Promise.all([
            prisma.ciudades.findMany({
                skip,
                take: limit,
                where: whereConditions,
            }),
            prisma.ciudades.count({
                where: whereConditions,
            }),
        ]);
        res.json({
            data: ciudades,
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
        res.status(500).json({ message: "Error al obtener las ciudades" });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getCiudades = getCiudades;
const createCiudad = async (req, res) => {
    const { nombre, descripcion, imagenThumbnail, coordenadas } = req.body;
    try {
        await prisma.ciudades.create({
            data: { nombre, descripcion, coordenadas, imagen: imagenThumbnail },
        });
        res.status(201).json({ mensaje: "Ciudad agregada correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la ciudad" });
    }
};
exports.createCiudad = createCiudad;
const updateCiudad = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, imagenThumbnail, coordenadas } = req.body;
    try {
        const ciudadActual = await prisma.ciudades.findUnique({
            where: { id: Number(id) },
            select: { imagen: true },
        });
        if (ciudadActual?.imagen) {
            const imagenPath = path_1.default.join(__dirname, "../../public", ciudadActual.imagen);
            fs_1.default.unlink(imagenPath, (err) => {
                if (err) {
                    console.error("Error eliminando la imagen:", err);
                }
            });
        }
        await prisma.ciudades.update({
            where: { id: Number(id) },
            data: { nombre, descripcion, imagen: imagenThumbnail, coordenadas },
        });
        res.json({ mensaje: "Ciudad actualizada" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar la ciudad" });
    }
};
exports.updateCiudad = updateCiudad;
const deleteCiudad = async (req, res) => {
    const { id } = req.params;
    try {
        const ciudadActual = await prisma.ciudades.findUnique({
            where: { id: Number(id) },
            select: { imagen: true },
        });
        if (ciudadActual?.imagen) {
            const imagenPath = path_1.default.join(__dirname, "../../public", ciudadActual.imagen);
            fs_1.default.unlink(imagenPath, (err) => {
                if (err) {
                    console.error("Error eliminando la imagen:", err);
                }
            });
        }
        await prisma.ciudades.delete({
            where: { id: Number(id) },
        });
        res.json({ mensaje: "Ciudad eliminada correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la ciudad" });
    }
};
exports.deleteCiudad = deleteCiudad;
//# sourceMappingURL=ciudades.controller.js.map