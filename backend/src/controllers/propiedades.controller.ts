import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Genera un slug único para una propiedad.
 * @param slugBase El slug base (ej. "casa-bonita-en-lima")
 * @returns Un slug único (ej. "casa-bonita-en-lima-2")
 */
async function generarSlugUnico(slugBase: string): Promise<string> {
  const prisma = new PrismaClient();

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

export const getPropiedades = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 100;
  const search = (req.query.search as string)?.trim() || "";

  const skip = (page - 1) * limit;
  const searchLower = search.toLowerCase();

  const whereConditions: any = {};

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
            select: {
              id: true,
              url: true,
            },
            orderBy: { id: "asc" }, // opcional: para que siempre vengan en orden definido
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las propiedades" });
  } finally {
    await prisma.$disconnect();
  }
};
export const crearPropiedad = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      titulo,
      descripcionLarga,
      descripcionCorta,
      direccion,
      precio,
      video,
      coordenadas,
      idUser,
      fondoPortada,
      disponibilidad,
      exclusivo,
      tipoPropiedadId,
      ciudadId,
      estado,
      imagenes,
    } = req.body;

    if (imagenes.length > 6) {
      return res.status(400).json({ message: "Máximo 6 imágenes permitidas" });
    }
    // Asegurarnos de que sean arreglos de strings
    const imagenesUrls: string[] = Array.isArray(imagenes) ? imagenes : [];
    const fondoPortadaUrls: string[] = Array.isArray(fondoPortada)
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
        idUser,
        disponibilidad,
        exclusivo: exclusivo === "true" || exclusivo === true,
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la propiedad" });
  }
};

export const editarPropiedad = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const {
      titulo,
      descripcionLarga,
      descripcionCorta,
      direccion,
      precio,
      video,
      coordenadas,
      fondoPortada,
      disponibilidad,
      exclusivo,
      tipoPropiedadId,
      ciudadId,
      estado,
      imagenes, // Array de URLs
    } = req.body;

    if (imagenes && imagenes.length > 6) {
      return res.status(400).json({ message: "Máximo 6 imágenes permitidas" });
    }

    await prisma.propiedad.update({
      where: { id },
      data: {
        titulo,
        descripcionLarga,
        descripcionCorta,
        direccion,
        precio,
        video,
        coordenadas,
        fondoPortada,
        disponibilidad,
        exclusivo,
        tipoPropiedadId,
        ciudadId,
        estado,
      },
      include: { imagenes: true },
    });

    // Si se enviaron nuevas imágenes, elimina las anteriores y agrega las nuevas
    if (imagenes) {
      await prisma.imagen.deleteMany({
        where: {
          OR: [{ propiedadImagenId: id }, { propiedadFondoPortadaId: id }],
        },
      });

      await prisma.imagen.createMany({
        data: imagenes.map((url: string) => ({
          url,
          propiedadId: id,
        })),
      });
    }

    const propiedadFinal = await prisma.propiedad.findUnique({
      where: { id },
      include: { imagenes: true, tipoPropiedad: true },
    });

    res.status(200).json(propiedadFinal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la propiedad" });
  }
};

export const eliminarPropiedad = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la propiedad" });
  }
};

/********************************************* */
export const getPropiedadById = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: "Falta el parámetro 'id'",
      });
    }

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

    return res.json({
      ok: true,
      data: propiedad,
    });
  } catch (error) {
    console.error("Error al buscar la propiedad:", error);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
};

//type Disponibilidad = "EN_COMPRA" | "EN_VENTA" | "EN_ALQUILER";

export type EstadoType = "EN_REVISION" | "PUBLICADO" | "RECHAZADO" | "OCULTO";

export const buscarPropiedades = async (req: any, res: any) => {
  try {
    // 1) Extraer y normalizar query params
    console.log("QUERYS: ", req.query);
    const {
      tipo_propiedad: rawTipoPropiedad,
      ciudad: rawCiudad,
      estado: rawEstado,
      search: rawSearch,
      disponibilidad: rawDisponibilidad,
    } = req.query;

    // ─── PAGINACIÓN ─────────────────────────────────────────────────

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 1;
    const skip = (page - 1) * limit;

    // ─── FILTROS OPCIONALES ──────────────────────────────────────────
    // 3) Extraemos y validamos los filtros (solo mostramos aquí 'tipo' y 'ciudad' a modo de ejemplo):
    // a) tipo (nombre de TipoPropiedad):
    let tipoNombre: string | undefined;
    if (Array.isArray(rawTipoPropiedad)) {
      const candidate = rawTipoPropiedad[0]?.trim();
      if (candidate && candidate.length > 0) {
        tipoNombre = candidate;
      }
    } else if (
      typeof rawTipoPropiedad === "string" &&
      rawTipoPropiedad.trim().length > 0
    ) {
      tipoNombre = rawTipoPropiedad.trim();
    }

    // b) ciudad:
    let ciudadId: string | undefined;
    if (Array.isArray(rawCiudad)) {
      const parsed = rawCiudad[0]?.trim();
      if (parsed && parsed.length > 0) {
        tipoNombre = parsed;
      }
    } else if (typeof rawCiudad === "string" && rawCiudad.trim().length > 0) {
      ciudadId = rawCiudad.trim();
    }

    // … (aquí continuarías validando disponibilidad, estado, search, igual que tenías antes) …

    // 4) Construcción del whereClause **MODIFICADO** para filtrar por nombre de tipo:
    const whereClause: any = { AND: [] };

    // a) Si recibimos ?estado=..., lo metemos:
    if (typeof rawEstado === "string" && rawEstado.trim().length > 0) {
      const cand = rawEstado.trim().toUpperCase();
      if (
        cand === "EN_REVISION" ||
        cand === "PUBLICADO" ||
        cand === "RECHAZADO" ||
        cand === "OCULTO"
      ) {
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
    if (
      Array.isArray(rawDisponibilidad) ||
      typeof rawDisponibilidad === "string"
    ) {
      const rawDisp = Array.isArray(rawDisponibilidad)
        ? rawDisponibilidad[0]
        : rawDisponibilidad;
      if (typeof rawDisp === "string") {
        const cand = rawDisp.trim().toUpperCase();
        if (
          cand === "EN_COMPRA" ||
          cand === "EN_VENTA" ||
          cand === "EN_ALQUILER"
        ) {
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
  } catch (error) {
    console.error("Error en buscarPropiedades:", error);
    return res.status(500).json({
      message: "Error interno al buscar propiedades.",
      error: (error as Error).message,
    });
  }
};
