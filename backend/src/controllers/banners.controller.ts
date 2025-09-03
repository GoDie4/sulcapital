import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
import path from "path";
import fs from "fs";
export const getAllBanners = async (req: any, res: Response) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const search = (req.query.search as string)?.trim() || "";

  const skip = (page - 1) * limit;
  const searchLower = search.toLowerCase();

  const whereConditions: any = {};

  if (searchLower) {
    whereConditions.OR = [
      { titulo: { contains: searchLower, mode: "insensitive" } },
      { descripcion: { contains: searchLower, mode: "insensitive" } },
    ];
  }

  try {
    const [banners, total] = await Promise.all([
      prisma.bannersWeb.findMany({
        skip,
        take: limit,
        where: whereConditions,
        orderBy: { posicion: "asc" },
      }),
      prisma.bannersWeb.count({
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los banners", error });
  } finally {
    await prisma.$disconnect();
  }
};

export const getBannerById = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  try {
    const banner = await prisma.bannersWeb.findUnique({ where: { id } });
    if (!banner)
      return res.status(404).json({ message: "Banner no encontrado" });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el banner", error: err });
  }
};

export const createBanner = async (req: Request, res: Response) => {
  const { titulo, descripcion, imagenThumbnail, posicion } = req.body;

  try {
    await prisma.bannersWeb.create({
      data: {
        titulo,
        descripcion,
        imagen: imagenThumbnail,
        posicion: Number(posicion),
      },
    });

    res.status(201).json({ mensaje: "Banner creado correctamente" });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({ message: "Error al crear el banner" });
  }
};

export const updateBanner = async (req: any, res: any) => {
  const { id } = req.params;
  const { titulo, descripcion, imagenThumbnail, posicion } = req.body;

  try {
    // 1) Buscar el banner actual para verificar la imagen anterior
    const bannerActual = await prisma.bannersWeb.findUnique({
      where: { id },
      select: { imagen: true },
    });

    if (!bannerActual) {
      return res.status(404).json({ message: "Banner no encontrado" });
    }

    // 2) Preparar solo los campos que se van a actualizar
    const dataToUpdate: {
      titulo?: string;
      descripcion?: string;
      imagen?: string;
      posicion?: number;
    } = {};

    if (typeof titulo === "string") dataToUpdate.titulo = titulo;
    if (typeof descripcion === "string") dataToUpdate.descripcion = descripcion;
    dataToUpdate.posicion = Number(posicion);

    // 3) Si se envió una nueva imagen, borrar la anterior
    if (typeof imagenThumbnail === "string" && imagenThumbnail.trim() !== "") {
      if (bannerActual.imagen) {
        const rutaViejaImagen = path.join(
          __dirname,
          "../../public",
          bannerActual.imagen
        );
        fs.unlink(rutaViejaImagen, (err) => {
          if (err) {
            console.error("Error eliminando la imagen anterior:", err);
          }
        });
      }
      dataToUpdate.imagen = imagenThumbnail;
    }

    // 4) Actualizar el banner
    const bannerActualizado = await prisma.bannersWeb.update({
      where: { id },
      data: dataToUpdate,
    });

    return res.json({
      mensaje: "Banner actualizado correctamente",
      banner: bannerActualizado,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el banner" });
  }
};

export const deleteBanner = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Buscar el banner actual para obtener la ruta de imagen
    const bannerActual = await prisma.bannersWeb.findUnique({
      where: { id },
      select: { imagen: true },
    });

    // Si existe una imagen, eliminarla del sistema de archivos
    if (bannerActual?.imagen) {
      const imagenPath = path.join(
        __dirname,
        "../../public",
        bannerActual.imagen
      );

      fs.unlink(imagenPath, (err) => {
        if (err) {
          console.error("Error eliminando la imagen del banner:", err);
        }
      });
    }

    // Eliminar el banner de la base de datos
    await prisma.bannersWeb.delete({
      where: { id },
    });

    res.json({ mensaje: "Banner eliminado correctamente" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar el banner" });
  }
};
