"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTipoPropiedad = exports.updateTipoPropiedad = exports.createTipoPropiedad = exports.getTiposPropiedades = void 0;
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const getTiposPropiedades = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const search = req.query.search?.trim() || "";
    const skip = (page - 1) * limit;
    const searchLower = search.toLowerCase();
    const whereConditions = {};
    if (searchLower) {
        whereConditions.OR = [{ nombre: { contains: searchLower } }];
    }
    try {
        const [tipo_propiedades, total] = await Promise.all([
            prisma.tipoPropiedad.findMany({
                skip,
                take: limit,
                where: whereConditions,
            }),
            prisma.tipoPropiedad.count({
                where: whereConditions,
            }),
        ]);
        res.json({
            data: tipo_propiedades,
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
        res
            .status(500)
            .json({ message: "Error al obtener los tipos de propiedades" });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getTiposPropiedades = getTiposPropiedades;
const createTipoPropiedad = async (req, res) => {
    const { nombre, imagenThumbnail, iconoThumbnail } = req.body;
    try {
        await prisma.tipoPropiedad.create({
            data: { nombre, imagen: imagenThumbnail, icono: iconoThumbnail },
        });
        res
            .status(201)
            .json({ mensaje: "Tipo de propiedad agregado correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el tipo de propiedad" });
    }
};
exports.createTipoPropiedad = createTipoPropiedad;
const updateTipoPropiedad = async (req, res) => {
    const { id } = req.params;
    const { nombre, imagenThumbnail, iconoThumbnail } = req.body;
    try {
        // 1) Buscamos el registro actual para saber cuáles archivos existen
        const tipoPropiedadActual = await prisma.tipoPropiedad.findUnique({
            where: { id },
            select: { imagen: true, icono: true },
        });
        if (!tipoPropiedadActual) {
            return res
                .status(404)
                .json({ message: "Tipo de propiedad no encontrado" });
        }
        // 2) Preparamos el objeto "data" solo con los campos que realmente se van a actualizar
        const dataToUpdate = {};
        // Siempre actualizamos el nombre (puede venir undefined si no se incluyó, en ese caso no lo agregamos)
        if (typeof nombre === "string") {
            dataToUpdate.nombre = nombre;
        }
        // 3) Si llega una nueva imagenThumbnail, borramos la anterior y anotamos la nueva ruta
        if (typeof imagenThumbnail === "string" && imagenThumbnail.trim() !== "") {
            if (tipoPropiedadActual.imagen) {
                const rutaViejaImagen = path_1.default.join(__dirname, "../../public", tipoPropiedadActual.imagen);
                fs_1.default.unlink(rutaViejaImagen, (err) => {
                    if (err) {
                        console.error("Error eliminando la imagen anterior:", err);
                    }
                });
            }
            dataToUpdate.imagen = imagenThumbnail;
        }
        // 4) Si llega un nuevo iconoThumbnail, borramos el anterior y anotamos la nueva ruta
        if (typeof iconoThumbnail === "string" && iconoThumbnail.trim() !== "") {
            if (tipoPropiedadActual.icono) {
                const rutaViejaIcono = path_1.default.join(__dirname, "../../public", tipoPropiedadActual.icono);
                fs_1.default.unlink(rutaViejaIcono, (err) => {
                    if (err) {
                        console.error("Error eliminando el ícono anterior:", err);
                    }
                });
            }
            dataToUpdate.icono = iconoThumbnail;
        }
        // 5) Hacemos la actualización con solo los campos que llegaron
        const tipoPropiedadActualizada = await prisma.tipoPropiedad.update({
            where: { id },
            data: dataToUpdate,
        });
        return res.json({
            mensaje: "Tipo de propiedad actualizado",
            tipoPropiedad: tipoPropiedadActualizada,
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Error al actualizar el tipo de propiedad" });
    }
};
exports.updateTipoPropiedad = updateTipoPropiedad;
const deleteTipoPropiedad = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoPropiedadActual = await prisma.tipoPropiedad.findUnique({
            where: { id: id },
            select: { imagen: true, icono: true },
        });
        if (tipoPropiedadActual?.imagen) {
            const imagenPath = path_1.default.join(__dirname, "../../public", tipoPropiedadActual.imagen);
            fs_1.default.unlink(imagenPath, (err) => {
                if (err) {
                    console.error("Error eliminando la imagen:", err);
                }
            });
        }
        if (tipoPropiedadActual?.icono) {
            const imagenPath = path_1.default.join(__dirname, "../../public", tipoPropiedadActual.icono);
            fs_1.default.unlink(imagenPath, (err) => {
                if (err) {
                    console.error("Error eliminando el icono:", err);
                }
            });
        }
        await prisma.tipoPropiedad.delete({
            where: { id: id },
        });
        res.json({ mensaje: "Tipo de propiedad eliminado correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el tipo de propiedad" });
    }
};
exports.deleteTipoPropiedad = deleteTipoPropiedad;
//# sourceMappingURL=tipoPropiedades.controller.js.map