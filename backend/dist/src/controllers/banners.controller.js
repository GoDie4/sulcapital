"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBanner = exports.updateBanner = exports.createBanner = exports.getBannerById = exports.getAllBanners = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getAllBanners = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const search = req.query.search?.trim() || "";
    const skip = (page - 1) * limit;
    const searchLower = search.toLowerCase();
    const whereConditions = {};
    if (searchLower) {
        whereConditions.OR = [
            { titulo: { contains: searchLower, mode: "insensitive" } },
            { descripcion: { contains: searchLower, mode: "insensitive" } },
        ];
    }
    try {
        const [banners, total] = await Promise.all([
            exports.prisma.bannersWeb.findMany({
                skip,
                take: limit,
                where: whereConditions,
                orderBy: { posicion: "asc" },
            }),
            exports.prisma.bannersWeb.count({
                where: whereConditions,
            }),
        ]);
        res.json({
            data: banners,
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
        res.status(500).json({ message: "Error al obtener los banners", error });
    }
    finally {
        await exports.prisma.$disconnect();
    }
};
exports.getAllBanners = getAllBanners;
const getBannerById = async (req, res) => {
    const { id } = req.params;
    try {
        const banner = await exports.prisma.bannersWeb.findUnique({ where: { id } });
        if (!banner)
            return res.status(404).json({ message: "Banner no encontrado" });
        res.json(banner);
    }
    catch (err) {
        res.status(500).json({ message: "Error al obtener el banner", error: err });
    }
};
exports.getBannerById = getBannerById;
const createBanner = async (req, res) => {
    const { titulo, descripcion, imagenThumbnail, posicion } = req.body;
    try {
        await exports.prisma.bannersWeb.create({
            data: {
                titulo,
                descripcion,
                imagen: imagenThumbnail,
                posicion: Number(posicion),
            },
        });
        res.status(201).json({ mensaje: "Banner creado correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el banner" });
    }
};
exports.createBanner = createBanner;
const updateBanner = async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, imagenThumbnail, posicion } = req.body;
    try {
        // 1) Buscar el banner actual para verificar la imagen anterior
        const bannerActual = await exports.prisma.bannersWeb.findUnique({
            where: { id },
            select: { imagen: true },
        });
        if (!bannerActual) {
            return res.status(404).json({ message: "Banner no encontrado" });
        }
        // 2) Preparar solo los campos que se van a actualizar
        const dataToUpdate = {};
        if (typeof titulo === "string")
            dataToUpdate.titulo = titulo;
        if (typeof descripcion === "string")
            dataToUpdate.descripcion = descripcion;
        dataToUpdate.posicion = Number(posicion);
        // 3) Si se envió una nueva imagen, borrar la anterior
        if (typeof imagenThumbnail === "string" && imagenThumbnail.trim() !== "") {
            if (bannerActual.imagen) {
                const rutaViejaImagen = path_1.default.join(__dirname, "../../public", bannerActual.imagen);
                fs_1.default.unlink(rutaViejaImagen, (err) => {
                    if (err) {
                        console.error("Error eliminando la imagen anterior:", err);
                    }
                });
            }
            dataToUpdate.imagen = imagenThumbnail;
        }
        // 4) Actualizar el banner
        const bannerActualizado = await exports.prisma.bannersWeb.update({
            where: { id },
            data: dataToUpdate,
        });
        return res.json({
            mensaje: "Banner actualizado correctamente",
            banner: bannerActualizado,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar el banner" });
    }
};
exports.updateBanner = updateBanner;
const deleteBanner = async (req, res) => {
    const { id } = req.params;
    try {
        // Buscar el banner actual para obtener la ruta de imagen
        const bannerActual = await exports.prisma.bannersWeb.findUnique({
            where: { id },
            select: { imagen: true },
        });
        // Si existe una imagen, eliminarla del sistema de archivos
        if (bannerActual?.imagen) {
            const imagenPath = path_1.default.join(__dirname, "../../public", bannerActual.imagen);
            fs_1.default.unlink(imagenPath, (err) => {
                if (err) {
                    console.error("Error eliminando la imagen del banner:", err);
                }
            });
        }
        // Eliminar el banner de la base de datos
        await exports.prisma.bannersWeb.delete({
            where: { id },
        });
        res.json({ mensaje: "Banner eliminado correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar el banner" });
    }
};
exports.deleteBanner = deleteBanner;
//# sourceMappingURL=banners.controller.js.map