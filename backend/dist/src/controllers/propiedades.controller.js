"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buscarPropiedades = exports.getPropiedadById = exports.eliminarPropiedad = exports.editarPropiedad = exports.crearPropiedad = exports.getPropiedadesByUserFromAdmin = exports.getPropiedadesByUser = exports.getPropiedades = void 0;
const client_1 = require("@prisma/client");
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
        res.status(500).json({ message: "Error al obtener las propiedades" });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getPropiedades = getPropiedades;
const getPropiedadesByUser = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const search = req.query.search?.trim() || "";
    console.log("Querys: ", req.query);
    const skip = (page - 1) * limit;
    const searchLower = search.toLowerCase();
    const estado = req.query.estado?.trim() || "";
    const disponibilidad = req.query.disponibilidad?.trim() || "";
    const ciudad = req.query.ciudad?.trim() || "";
    const tipo = req.query.tipo?.trim() || "";
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Usuario no autenticado" });
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
        res.status(500).json({ message: "Error al obtener las propiedades" });
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
        return res.status(401).json({ message: "Usuario no autenticado" });
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
        res.status(500).json({ message: "Error al obtener las propiedades" });
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.getPropiedadesByUserFromAdmin = getPropiedadesByUserFromAdmin;
const crearPropiedad = async (req, res) => {
    try {
        const { titulo, descripcionLarga, descripcionCorta, direccion, precio, video, coordenadas, idUser, fondoPortada, disponibilidad, exclusivo, tipoPropiedadId, ciudadId, estado, imagenes, } = req.body;
        if (imagenes.length > 6) {
            return res.status(400).json({ message: "Máximo 6 imágenes permitidas" });
        }
        // Asegurarnos de que sean arreglos de strings
        const imagenesUrls = Array.isArray(imagenes) ? imagenes : [];
        const fondoPortadaUrls = Array.isArray(fondoPortada)
            ? fondoPortada
            : [];
        const slugBase = titulo.toLowerCase().replace(/\s+/g, "-");
        const slugUnico = await generarSlugUnico(slugBase);
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
                estado,
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
        res.status(500).json({ message: "Error al crear la propiedad" });
    }
};
exports.crearPropiedad = crearPropiedad;
const editarPropiedad = async (req, res) => {
    try {
        console.log(req.body);
        const { id } = req.params;
        const { titulo, descripcionLarga, descripcionCorta, direccion, precio, video, coordenadas, fondoPortada, // Array de URLs para portadas
        disponibilidad, exclusivo, tipoPropiedadId, ciudadId, estado, imagenes, // Array de URLs para imágenes normales
         } = req.body;
        // 1) Validaciones básicas de cantidad (solo si vienen los campos)
        if (imagenes && Array.isArray(imagenes) && imagenes.length > 6) {
            return res.status(400).json({ message: "Máximo 6 imágenes permitidas" });
        }
        if (fondoPortada &&
            Array.isArray(fondoPortada) &&
            fondoPortada.length > 6) {
            return res
                .status(400)
                .json({ message: "Máximo 6 imágenes de portada permitidas" });
        }
        // ------------------------------------------------------------
        // 2) Actualizar campos básicos de la propiedad (siempre)
        // ------------------------------------------------------------
        await prisma.propiedad.update({
            where: { id },
            data: {
                titulo,
                descripcionLarga,
                descripcionCorta,
                direccion,
                precio: Number(precio),
                video,
                coordenadas,
                disponibilidad,
                exclusivo: exclusivo === "si" || exclusivo === true,
                estado,
                tipoPropiedad: { connect: { id: tipoPropiedadId } },
                ciudad: { connect: { id: Number(ciudadId) } },
            },
        });
        // ------------------------------------------------------------
        // 3) Si vienen nuevas imágenes O nuevas portadas, reemplazar:
        // ------------------------------------------------------------
        const vienenImagenesNormales = Array.isArray(imagenes) && imagenes.length > 0;
        const vienenPortadas = Array.isArray(fondoPortada) && fondoPortada.length > 0;
        if (vienenImagenesNormales || vienenPortadas) {
            // 3a) Borrar TODO lo que exista (normales + portadas) solo si se
            //     sube al menos uno de los dos tipos en este update
            await prisma.imagen.deleteMany({
                where: {
                    OR: [
                        { propiedadImagenId: id }, // imágenes normales
                        { propiedadFondoPortadaId: id }, // portadas
                    ],
                },
            });
            // 3b) Insertar nuevas imágenes normales (si vienen)
            if (vienenImagenesNormales) {
                const dataFotosNormales = imagenes.map((url) => ({
                    url,
                    propiedadImagenId: id,
                }));
                await prisma.imagen.createMany({
                    data: dataFotosNormales,
                });
            }
            // 3c) Insertar nuevas portadas (si vienen)
            if (vienenPortadas) {
                const dataFotosPortada = fondoPortada.map((urlFondo) => ({
                    url: urlFondo,
                    propiedadFondoPortadaId: id,
                }));
                await prisma.imagen.createMany({
                    data: dataFotosPortada,
                });
            }
        }
        // ------------------------------------------------------------
        // 4) Traer la propiedad resultante con sus relaciones e imágenes
        // ------------------------------------------------------------
        await prisma.propiedad.findUnique({
            where: { id },
            include: {
                tipoPropiedad: { select: { nombre: true } },
                imagenes: true, // filas con propiedadImagenId = id
                fondoPortada: true, // filas con propiedadFondoPortadaId = id
            },
        });
        return res.status(200).json({
            mensaje: "Propiedad actualizada",
        });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ message: "Error al actualizar la propiedad", error });
    }
};
exports.editarPropiedad = editarPropiedad;
const eliminarPropiedad = async (req, res) => {
    try {
        const { id } = req.params;
        // Primero elimina las imágenes
        await prisma.imagen.deleteMany({
            where: {
                OR: [{ propiedadImagenId: id }, { propiedadFondoPortadaId: id }],
            },
        });
        // Luego elimina la propiedad
        await prisma.propiedad.delete({
            where: { id },
        });
        res.status(200).json({ message: "Propiedad eliminada correctamente" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar la propiedad" });
    }
};
exports.eliminarPropiedad = eliminarPropiedad;
/********************************************* */
const getPropiedadById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                ok: false,
                message: "Falta el parámetro 'id'",
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
            },
        });
        if (!propiedad) {
            return res.status(404).json({
                ok: false,
                message: "Propiedad no encontrada",
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
        return res.json({
            ok: true,
            data: {
                propiedad,
                ultimasPropiedades,
            },
        });
    }
    catch (error) {
        console.error("Error al buscar la propiedad:", error);
        return res.status(500).json({
            ok: false,
            message: "Error interno del servidor",
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
            message: "Error interno al buscar propiedades.",
            error: error.message,
        });
    }
};
exports.buscarPropiedades = buscarPropiedades;
//# sourceMappingURL=propiedades.controller.js.map