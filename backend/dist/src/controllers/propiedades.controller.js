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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarConsultaPropiedad = exports.buscarPropiedades = exports.getPropiedadById = exports.eliminarPropiedad = exports.cambiarEstadoPropiedad = exports.editarPropiedad = exports.crearPropiedad = exports.getPropiedadesByUserFromAdmin = exports.getPropiedadesByUser = exports.getPropiedadesConFavoritos = exports.getUltimasPropiedades = exports.getPropiedades = void 0;
const client_1 = require("@prisma/client");
const mail_controller_1 = require("./mail.controller");
const fs_1 = __importDefault(require("fs"));
const fses = __importStar(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config/config");
const prisma = new client_1.PrismaClient();
/**
 * Genera un slug único para una propiedad.
 * @param slugBase El slug base (ej. "casa-bonita-en-lima")
 * @returns Un slug único (ej. "casa-bonita-en-lima-2")
 */
async function generarSlugUnico(slugBase) {
    const prisma = new client_1.PrismaClient();
    // Inicialmente probamos con el slug base
    let slug = slugBase;
    let contador = 1;
    // Busca si el slug ya existe en la base de datos
    let existe = await prisma.propiedad.findFirst({
        where: { slug },
    });
    // Si existe, genera un nuevo slug añadiendo un sufijo incremental
    while (existe) {
        slug = `${slugBase}-${contador}`;
        contador++;
        existe = await prisma.propiedad.findFirst({
            where: { slug },
        });
    }
    return slug;
}
const getPropiedades = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const search = req.query.search?.trim() || "";
    const skip = (page - 1) * limit;
    const searchLower = search.toLowerCase();
    const whereConditions = {
        estado: "PUBLICADO",
    };
    if (searchLower) {
        whereConditions.OR = [
            { titulo: { contains: searchLower } },
            { descripcionLarga: { contains: searchLower } },
            { descripcionCorta: { contains: searchLower } },
            { direccion: { contains: searchLower } },
            { estado: "PUBLICADO" },
        ];
    }
    try {
        const [propiedades, total] = await Promise.all([
            prisma.propiedad.findMany({
                skip,
                take: limit,
                where: whereConditions,
                include: {
                    tipoPropiedad: { select: { nombre: true } },
                    ciudad: true,
                    imagenes: {
                        select: {
                            id: true,
                            url: true,
                        },
                        orderBy: { id: "asc" },
                    },
                    fondoPortada: {
                        select: {
                            id: true,
                            url: true,
                        },
                        orderBy: { id: "asc" },
                    },
                },
                orderBy: { createdAt: "desc" },
            }),
            prisma.propiedad.count({
                where: whereConditions,
            }),
        ]);
        res.json({
            data: propiedades,
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
        res.status(500).json({ mensaje: "Error al obtener las propiedades" });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getPropiedades = getPropiedades;
const getUltimasPropiedades = async (req, res) => {
    try {
        const propiedades = await prisma.propiedad.findMany({
            where: {
                estado: "PUBLICADO",
            },
            take: 3,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                tipoPropiedad: { select: { nombre: true } },
                ciudad: true,
                imagenes: {
                    select: {
                        id: true,
                        url: true,
                    },
                    orderBy: { id: "asc" },
                },
                fondoPortada: {
                    select: {
                        id: true,
                        url: true,
                    },
                    orderBy: { id: "asc" },
                },
            },
        });
        res.json({ data: propiedades });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener las propiedades" });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getUltimasPropiedades = getUltimasPropiedades;
const getPropiedadesConFavoritos = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const search = req.query.search?.trim() || "";
    const skip = (page - 1) * limit;
    const searchLower = search.toLowerCase();
    const userId = req.user?.id;
    const whereConditions = {
        estado: "PUBLICADO",
    };
    if (searchLower) {
        whereConditions.OR = [
            { titulo: { contains: searchLower } },
            { descripcionLarga: { contains: searchLower } },
            { descripcionCorta: { contains: searchLower } },
            { direccion: { contains: searchLower } },
            { estado: "PUBLICADO" },
        ];
    }
    try {
        const [propiedades, total] = await Promise.all([
            prisma.propiedad.findMany({
                skip,
                take: limit,
                where: whereConditions,
                include: {
                    tipoPropiedad: { select: { nombre: true } },
                    ciudad: true,
                    imagenes: {
                        select: {
                            id: true,
                            url: true,
                        },
                        orderBy: { id: "asc" },
                    },
                    fondoPortada: {
                        select: {
                            id: true,
                            url: true,
                        },
                        orderBy: { id: "asc" },
                    },
                    Favorito: userId
                        ? {
                            where: {
                                userId,
                            },
                            select: {
                                id: true,
                            },
                        }
                        : false,
                },
                orderBy: { createdAt: "desc" },
            }),
            prisma.propiedad.count({
                where: whereConditions,
            }),
        ]);
        const propiedadesConFavorito = propiedades.map((prop) => {
            const favorito = userId
                ? Array.isArray(prop.Favorito) && prop.Favorito.length > 0
                : false;
            // Elimina el array de favoritos si no necesitas enviarlo
            const { Favorito, ...rest } = prop;
            return {
                ...rest,
                favorito: favorito,
            };
        });
        res.json({
            data: propiedadesConFavorito,
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
        res.status(500).json({ mensaje: "Error al obtener las propiedades" });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getPropiedadesConFavoritos = getPropiedadesConFavoritos;
const getPropiedadesByUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const search = req.query.search?.trim() || "";
    const skip = (page - 1) * limit;
    const searchLower = search.toLowerCase();
    const estado = req.query.estado?.trim() || "";
    const disponibilidad = req.query.disponibilidad?.trim() || "";
    const ciudad = req.query.ciudad?.trim() || "";
    const tipo = req.query.tipo?.trim() || "";
    const user = req.user;
    if (!user) {
        return res.status(401).json({ mensaje: "Usuario no autenticado" });
    }
    const whereConditions = {};
    if (estado) {
        whereConditions.estado = estado;
    }
    if (disponibilidad) {
        whereConditions.disponibilidad = disponibilidad;
    }
    if (ciudad) {
        whereConditions.ciudad = {
            id: Number(ciudad),
        };
    }
    if (tipo) {
        whereConditions.tipoPropiedad = {
            id: tipo,
        };
    }
    // Si no es administrador, filtra por usuarioId
    if (user.rol_id !== 1) {
        whereConditions.idUser = user.id;
    }
    // Agregar condiciones de búsqueda si hay término
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
        res.json({
            data: propiedades,
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
        res.status(500).json({ mensaje: "Error al obtener las propiedades" });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getPropiedadesByUser = getPropiedadesByUser;
const getPropiedadesByUserFromAdmin = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const search = req.query.search?.trim() || "";
    const skip = (page - 1) * limit;
    const searchLower = search.toLowerCase();
    const id = req.params.id;
    if (!id) {
        return res.status(401).json({ mensaje: "Usuario no autenticado" });
    }
    const whereConditions = {};
    whereConditions.idUser = id;
    // Agregar condiciones de búsqueda si hay término
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
                    tipoPropiedad: { select: { nombre: true } },
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
        console.log("data: ", {
            data: propiedades,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
        res.json({
            data: propiedades,
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
        res.status(500).json({ mensaje: "Error al obtener las propiedades" });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getPropiedadesByUserFromAdmin = getPropiedadesByUserFromAdmin;
const crearPropiedad = async (req, res) => {
    try {
        const { titulo, descripcionLarga, descripcionCorta, direccion, precio, video, coordenadas, idUser, fondoPortada, disponibilidad, exclusivo, tipoPropiedadId, ciudadId, estado, imagenes, } = req.body;
        const imagenesUrls = Array.isArray(imagenes) ? imagenes : [];
        const fondoPortadaUrls = Array.isArray(fondoPortada)
            ? fondoPortada
            : [];
        const slugBase = titulo
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
        const slugUnico = await generarSlugUnico(slugBase);
        const usuario = await prisma.usuario.findUnique({
            where: { id: idUser },
            select: { publicaciones_automaticas: true },
        });
        const estadoFinal = usuario?.publicaciones_automaticas
            ? "PUBLICADO"
            : estado;
        const nuevaPropiedad = await prisma.propiedad.create({
            data: {
                titulo,
                slug: slugUnico,
                descripcionLarga,
                descripcionCorta,
                direccion,
                precio: Number(precio),
                video,
                coordenadas,
                usuario: { connect: { id: idUser } },
                disponibilidad,
                exclusivo: exclusivo === "si",
                tipoPropiedad: { connect: { id: tipoPropiedadId } },
                ciudad: { connect: { id: Number(ciudadId) } },
                estado: estadoFinal,
            },
        });
        const propiedadId = nuevaPropiedad.id;
        if (imagenesUrls.length > 0) {
            await prisma.imagen.createMany({
                data: imagenesUrls.map((url) => ({
                    url,
                    propiedadImagenId: propiedadId,
                    // ← así coincide con el campo de relación “propiedadImagenId” en el modelo Imagen
                })),
            });
        }
        // 5) Insertamos las portadas (propiedadFondoPortadaId)
        if (fondoPortadaUrls.length > 0) {
            await prisma.imagen.createMany({
                data: fondoPortadaUrls.map((urlFondo) => ({
                    url: urlFondo,
                    propiedadFondoPortadaId: propiedadId,
                })),
            });
        }
        // 6) Finalmente, traemos de nuevo la Propiedad completa con sus imágenes y portadas
        await prisma.propiedad.findUnique({
            where: { id: propiedadId },
            include: {
                tipoPropiedad: { select: { nombre: true } },
                imagenes: true, // trae las filas donde propiedadImagenId = propiedadId
                fondoPortada: true, // trae las filas donde propiedadFondoPortadaId = propiedadId
            },
        });
        res.status(201).json({ mensaje: "Propiedad agregada" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear la propiedad" });
    }
};
exports.crearPropiedad = crearPropiedad;
const editarPropiedad = async (req, res) => {
    try {
        const { id } = req.params;
        // Helper para convertir cadenas en arrays
        const parseToArray = (v) => {
            if (!v)
                return [];
            if (Array.isArray(v))
                return v;
            if (typeof v === "string") {
                try {
                    const parsed = JSON.parse(v);
                    if (Array.isArray(parsed))
                        return parsed;
                }
                catch {
                    return v
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean);
                }
            }
            return [];
        };
        const { titulo, descripcionLarga, descripcionCorta, direccion, precio, video, coordenadas, disponibilidad, exclusivo, tipoPropiedadId, ciudadId, estado, } = req.body;
        // Arrays de imágenes que llegan (pueden incluir antiguas y nuevas)
        const imagenesIncoming = parseToArray(req.body.imagenes);
        const portadasIncoming = parseToArray(req.body.fondoPortada);
        if (imagenesIncoming.length > 6)
            return res.status(400).json({ mensaje: "Máximo 6 imágenes permitidas" });
        if (portadasIncoming.length > 6)
            return res
                .status(400)
                .json({ mensaje: "Máximo 6 imágenes de portada permitidas" });
        // Generar slug único si hay título
        const slugBase = (titulo || "")
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-+|-+$/g, "");
        const slugUnico = await generarSlugUnico(slugBase);
        const publicDir = path_1.default.join(process.cwd(), "public");
        await prisma.$transaction(async (tx) => {
            // 1) Actualizar datos de la propiedad
            await tx.propiedad.update({
                where: { id },
                data: {
                    titulo,
                    slug: slugUnico,
                    descripcionLarga,
                    descripcionCorta,
                    direccion,
                    precio: precio !== undefined ? Number(precio) : undefined,
                    video,
                    coordenadas,
                    disponibilidad,
                    exclusivo: exclusivo === "si" || exclusivo === true || exclusivo === "true",
                    estado,
                    tipoPropiedad: tipoPropiedadId
                        ? { connect: { id: tipoPropiedadId } }
                        : undefined,
                    ciudad: ciudadId ? { connect: { id: Number(ciudadId) } } : undefined,
                },
            });
            // 2) Actualizar imágenes normales (galería)
            if (imagenesIncoming.length > 0) {
                const oldNormal = await tx.imagen.findMany({
                    where: { propiedadImagenId: id },
                });
                const urlsToKeep = new Set(imagenesIncoming);
                const toDelete = oldNormal.filter((img) => !urlsToKeep.has(img.url));
                // Eliminar físicamente las que se quitan
                for (const row of toDelete) {
                    try {
                        const absolute = path_1.default.join(publicDir, row.url.replace(/^\/*/, ""));
                        await fses.unlink(absolute).catch(() => { });
                    }
                    catch (e) {
                        console.warn("No se pudo eliminar archivo (normal):", row.url, e);
                    }
                }
                // Eliminar de DB las que se quitan
                if (toDelete.length > 0) {
                    await tx.imagen.deleteMany({
                        where: { id: { in: toDelete.map((img) => img.id) } },
                    });
                }
                // Agregar nuevas (las que no están en la DB)
                const existingUrls = new Set(oldNormal.map((img) => img.url));
                const newImages = imagenesIncoming.filter((url) => !existingUrls.has(url));
                if (newImages.length > 0) {
                    await tx.imagen.createMany({
                        data: newImages.map((url) => ({
                            url,
                            propiedadImagenId: id,
                        })),
                    });
                }
            }
            // 3) Actualizar imágenes de portada
            if (portadasIncoming.length > 0) {
                const oldPortadas = await tx.imagen.findMany({
                    where: { propiedadFondoPortadaId: id },
                });
                const urlsToKeep = new Set(portadasIncoming);
                const toDelete = oldPortadas.filter((img) => !urlsToKeep.has(img.url));
                for (const row of toDelete) {
                    try {
                        const absolute = path_1.default.join(publicDir, row.url.replace(/^\/*/, ""));
                        await fses.unlink(absolute).catch(() => { });
                    }
                    catch (e) {
                        console.warn("No se pudo eliminar archivo (portada):", row.url, e);
                    }
                }
                if (toDelete.length > 0) {
                    await tx.imagen.deleteMany({
                        where: { id: { in: toDelete.map((img) => img.id) } },
                    });
                }
                const existingUrls = new Set(oldPortadas.map((img) => img.url));
                const newImages = portadasIncoming.filter((url) => !existingUrls.has(url));
                if (newImages.length > 0) {
                    await tx.imagen.createMany({
                        data: newImages.map((url) => ({
                            url,
                            propiedadFondoPortadaId: id,
                        })),
                    });
                }
            }
        });
        // 4) Obtener propiedad actualizada
        const propiedadActualizada = await prisma.propiedad.findUnique({
            where: { id },
            include: {
                tipoPropiedad: { select: { nombre: true } },
                imagenes: true,
                fondoPortada: true,
            },
        });
        return res.status(200).json({
            mensaje: "Propiedad actualizada correctamente",
            data: propiedadActualizada,
        });
    }
    catch (error) {
        console.error("editarPropiedad error:", error);
        return res.status(500).json({
            mensaje: "Error al actualizar la propiedad",
            error: String(error),
        });
    }
};
exports.editarPropiedad = editarPropiedad;
const cambiarEstadoPropiedad = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado, mensaje } = req.body;
        const propiedad = await prisma.propiedad.findUnique({
            where: { id },
            include: {
                usuario: true,
            },
        });
        if (!propiedad) {
            return res.status(404).json({ mensaje: "Propiedad no encontrada" });
        }
        const estadoLegible = {
            PUBLICADO: "aprobada",
            RECHAZADO: "rechazada",
            OCULTO: "ocultada",
        };
        await prisma.propiedad.update({
            where: { id },
            data: {
                estado,
            },
        });
        console.log("body: ", req.body);
        console.log("estado: ", estadoLegible[estado]);
        console.log("mensaje: ", mensaje);
        await (0, mail_controller_1.sendEmail)(propiedad.usuario.email, `Tu propiedad fue ${estadoLegible[estado]}`, `EstadoCambiado.html`, {
            nombre: propiedad.usuario.nombres,
            propiedad: propiedad.titulo,
            estado: estadoLegible[estado],
            mensaje: mensaje,
        });
        return res.status(200).json({
            mensaje: "Propiedad actualizada",
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ mensaje: "Error al actualizar la propiedad", error });
    }
};
exports.cambiarEstadoPropiedad = cambiarEstadoPropiedad;
const eliminarPropiedad = async (req, res) => {
    try {
        const { id } = req.params;
        // 1. Buscar las imágenes en BD para poder borrarlas físicamente
        const imagenes = await prisma.imagen.findMany({
            where: {
                OR: [{ propiedadImagenId: id }, { propiedadFondoPortadaId: id }],
            },
        });
        // 2. Eliminar cada archivo físico
        imagenes.forEach((img) => {
            const filePath = path_1.default.join(__dirname, "../../public", img.url);
            if (fs_1.default.existsSync(filePath)) {
                fs_1.default.unlinkSync(filePath);
                console.log(`Eliminado: ${filePath}`);
            }
            else {
                console.log(`No encontrado: ${filePath}`);
            }
        });
        // 3. Eliminar favoritos
        await prisma.favorito.deleteMany({
            where: { propiedadId: id },
        });
        // 4. Eliminar "recientemente visto"
        await prisma.recientementeVisto.deleteMany({
            where: { propiedadId: id },
        });
        // 5. Eliminar registros de imágenes en BD
        await prisma.imagen.deleteMany({
            where: {
                OR: [{ propiedadImagenId: id }, { propiedadFondoPortadaId: id }],
            },
        });
        // 6. Eliminar propiedad
        await prisma.propiedad.delete({
            where: { id },
        });
        res
            .status(200)
            .json({ mensaje: "Propiedad e imágenes eliminadas correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar la propiedad" });
    }
};
exports.eliminarPropiedad = eliminarPropiedad;
// Luego elimina la propiedad await prisma.propiedad.delete({ where: { id }, }); res.status(200).json({ mensaje: "Propiedad eliminada correctamente" }); } catch (error: any) { console.error(error); res.status(500).json({ mensaje: "Error al eliminar la propiedad" }); } };
/********************************************* */
const getPropiedadById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                ok: false,
                mensaje: "Falta el parámetro 'id'",
            });
        }
        // Buscar la propiedad principal
        const propiedad = await prisma.propiedad.findUnique({
            where: { id },
            include: {
                fondoPortada: true,
                imagenes: true,
                tipoPropiedad: true,
                ciudad: true,
                usuario: {
                    select: {
                        celular: true,
                        nombres: true,
                    },
                },
            },
        });
        if (!propiedad) {
            return res.status(404).json({
                ok: false,
                mensaje: "Propiedad no encontrada",
            });
        }
        // Buscar las 2 últimas propiedades PUBLICADAS del mismo usuario, excluyendo esta propiedad
        const ultimasPropiedades = await prisma.propiedad.findMany({
            where: {
                idUser: propiedad.idUser,
                estado: "PUBLICADO",
                NOT: {
                    id: propiedad.id,
                },
            },
            orderBy: {
                createdAt: "desc", // o usa "id" si no tienes createdAt
            },
            take: 2,
            include: {
                fondoPortada: true,
                imagenes: true,
                tipoPropiedad: true,
                ciudad: true,
            },
        });
        const propiedadesRelacionadas = await prisma.propiedad.findMany({
            where: {
                ciudadId: propiedad.ciudadId,
                estado: "PUBLICADO",
                NOT: {
                    id: propiedad.id,
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 10,
            include: {
                fondoPortada: true,
                imagenes: true,
                tipoPropiedad: true,
                ciudad: true,
            },
        });
        return res.json({
            ok: true,
            data: {
                propiedad,
                ultimasPropiedades,
                propiedadesRelacionadas,
            },
        });
    }
    catch (error) {
        console.error("Error al buscar la propiedad:", error);
        return res.status(500).json({
            ok: false,
            mensaje: "Error interno del servidor",
        });
    }
};
exports.getPropiedadById = getPropiedadById;
const buscarPropiedades = async (req, res) => {
    try {
        // 1) Extraer y normalizar query params
        console.log("QUERYS: ", req.query);
        const { tipo_propiedad: rawTipoPropiedad, ciudad: rawCiudad, estado: rawEstado, search: rawSearch, disponibilidad: rawDisponibilidad, } = req.query;
        // ─── PAGINACIÓN ─────────────────────────────────────────────────
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const skip = (page - 1) * limit;
        // ─── FILTROS OPCIONALES ──────────────────────────────────────────
        // 3) Extraemos y validamos los filtros (solo mostramos aquí 'tipo' y 'ciudad' a modo de ejemplo):
        // a) tipo (nombre de TipoPropiedad):
        let tipoNombre;
        if (Array.isArray(rawTipoPropiedad)) {
            const candidate = rawTipoPropiedad[0]?.trim();
            if (candidate && candidate.length > 0) {
                tipoNombre = candidate;
            }
        }
        else if (typeof rawTipoPropiedad === "string" &&
            rawTipoPropiedad.trim().length > 0) {
            tipoNombre = rawTipoPropiedad.trim();
        }
        // b) ciudad:
        let ciudadId;
        if (Array.isArray(rawCiudad)) {
            const parsed = rawCiudad[0]?.trim();
            if (parsed && parsed.length > 0) {
                tipoNombre = parsed;
            }
        }
        else if (typeof rawCiudad === "string" && rawCiudad.trim().length > 0) {
            ciudadId = rawCiudad.trim();
        }
        // … (aquí continuarías validando disponibilidad, estado, search, igual que tenías antes) …
        // 4) Construcción del whereClause **MODIFICADO** para filtrar por nombre de tipo:
        const whereClause = { AND: [] };
        // a) Si recibimos ?estado=..., lo metemos:
        if (typeof rawEstado === "string" && rawEstado.trim().length > 0) {
            const cand = rawEstado.trim().toUpperCase();
            if (cand === "EN_REVISION" ||
                cand === "PUBLICADO" ||
                cand === "RECHAZADO" ||
                cand === "OCULTO") {
                whereClause.AND.push({ estado: cand });
            }
        }
        // b) **Filtro por tipo (nombre de TipoPropiedad)**:
        if (tipoNombre) {
            // EN LUGAR DE: whereClause.AND.push({ tipoPropiedadId: <uuid> });
            // hacemos un “join implícito” con la relación y filtramos por el nombre:
            whereClause.AND.push({
                tipoPropiedad: {
                    nombre: tipoNombre,
                },
            });
        }
        // c) Filtro por ciudad:
        if (ciudadId !== undefined) {
            whereClause.AND.push({ ciudad: { nombre: ciudadId } });
        }
        // d) Filtro por disponibilidad (idéntico a como lo tenías):
        if (Array.isArray(rawDisponibilidad) ||
            typeof rawDisponibilidad === "string") {
            const rawDisp = Array.isArray(rawDisponibilidad)
                ? rawDisponibilidad[0]
                : rawDisponibilidad;
            if (typeof rawDisp === "string") {
                const cand = rawDisp.trim().toUpperCase();
                if (cand === "EN_COMPRA" ||
                    cand === "EN_VENTA" ||
                    cand === "EN_ALQUILER") {
                    whereClause.AND.push({ disponibilidad: cand });
                }
            }
        }
        // e) Búsqueda de texto libre en título/descripcion (igual que antes):
        if (Array.isArray(rawSearch) || typeof rawSearch === "string") {
            const rawS = Array.isArray(rawSearch) ? rawSearch[0] : rawSearch;
            if (typeof rawS === "string" && rawS.trim().length > 0) {
                const term = rawS.trim();
                whereClause.AND.push({
                    OR: [
                        { titulo: { contains: term } },
                        { descripcionCorta: { contains: term } },
                        { descripcionLarga: { contains: term } },
                    ],
                });
            }
        }
        // Si no hubo ningún filtro, borramos el AND vacío:
        if (whereClause.AND.length === 0) {
            delete whereClause.AND;
        }
        console.log("WHER: ", whereClause);
        // ─── 5) CONSULTAR PRISMA: count() + findMany() ─────────────────────────────
        const [totalItems, propiedades] = await Promise.all([
            prisma.propiedad.count({ where: whereClause }),
            prisma.propiedad.findMany({
                where: whereClause,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    tipoPropiedad: {
                        select: { id: true, nombre: true, imagen: true, icono: true },
                    },
                    ciudad: {
                        select: { id: true, nombre: true },
                    },
                    imagenes: {
                        select: { id: true, url: true },
                    },
                    fondoPortada: {
                        select: { id: true, url: true },
                    },
                },
            }),
        ]);
        const totalPages = Math.ceil(totalItems / limit);
        // ─── 6) RESPUESTA EXITOSA ────────────────────────────────────────────────
        return res.status(200).json({
            data: propiedades,
            pagination: {
                total: totalItems,
                page,
                limit,
                totalPages,
            },
        });
    }
    catch (error) {
        console.error("Error en buscarPropiedades:", error);
        return res.status(500).json({
            mensaje: "Error interno al buscar propiedades.",
            error: error.message,
        });
    }
};
exports.buscarPropiedades = buscarPropiedades;
const enviarConsultaPropiedad = async (req, res) => {
    const { nombres, dni, email, celular, mensaje, idPropiedad, ciudad, tipo_propiedad } = req.body;
    try {
        let emailDestinatario = "";
        let datosExtra = {};
        if (idPropiedad && idPropiedad !== "") {
            // 🔹 Buscar propiedad solo si existe un ID válido
            const propiedad = await prisma.propiedad.findUnique({
                where: { id: idPropiedad },
                include: {
                    usuario: true,
                },
            });
            if (!propiedad || !propiedad.usuario) {
                return res.status(404).json({
                    mensaje: "Propiedad o usuario no encontrados",
                });
            }
            emailDestinatario = propiedad.usuario.email;
            datosExtra = {
                tipoPropiedad: tipo_propiedad,
                ciudad: ciudad,
            };
        }
        else {
            // 🔹 Caso cuando no hay idPropiedad
            emailDestinatario = config_1.ENV.ADMIN_EMAIL; // ✅ Aquí pon el correo por defecto
            datosExtra = {
                tipoPropiedad: tipo_propiedad || "No especificado",
                ciudad: ciudad || "No especificada",
            };
        }
        await (0, mail_controller_1.sendEmail)(emailDestinatario, "Nueva consulta", `NuevaConsulta.html`, {
            nombres,
            email,
            dni,
            celular,
            mensaje,
            ...datosExtra,
        });
        return res.json({
            mensaje: `Se envió tu consulta correctamente`,
            status: 200,
        });
    }
    catch (error) {
        console.error("Error al enviar consulta", error);
        return res.status(500).json({
            mensaje: "Error interno del servidor",
        });
    }
};
exports.enviarConsultaPropiedad = enviarConsultaPropiedad;
//# sourceMappingURL=propiedades.controller.js.map