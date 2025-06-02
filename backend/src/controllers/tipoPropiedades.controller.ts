import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
const prisma = new PrismaClient();

export const getTiposPropiedades = async (req: any, res: any) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 100;
  const search = (req.query.search as string)?.trim() || "";

  const skip = (page - 1) * limit;
  const searchLower = search.toLowerCase();

  const whereConditions: any = {};

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
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al obtener los tipos de propiedades" });
  } finally {
    await prisma.$disconnect();
  }
};

export const createTipoPropiedad = async (req: Request, res: Response) => {
  const { nombre, imagenThumbnail, iconoThumbnail } = req.body;
  try {
    await prisma.tipoPropiedad.create({
      data: { nombre, imagen: imagenThumbnail, icono: iconoThumbnail },
    });
    res
      .status(201)
      .json({ mensaje: "Tipo de propiedad agregado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el tipo de propiedad" });
  }
};

export const updateTipoPropiedad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, imagenThumbnail, iconoThumbnail } = req.body;

  try {
    const tipoPropiedadActual = await prisma.tipoPropiedad.findUnique({
      where: { id: id },
      select: { imagen: true, icono: true },
    });
    if (tipoPropiedadActual?.imagen) {
      const imagenPath = path.join(
        __dirname,
        "../../public",
        tipoPropiedadActual.imagen
      );

      fs.unlink(imagenPath, (err) => {
        if (err) {
          console.error("Error eliminando la imagen:", err);
        }
      });
    }
    if (tipoPropiedadActual?.icono) {
      const imagenPath = path.join(
        __dirname,
        "../../public",
        tipoPropiedadActual.icono
      );

      fs.unlink(imagenPath, (err) => {
        if (err) {
          console.error("Error eliminando el icono:", err);
        }
      });
    }
    await prisma.tipoPropiedad.update({
      where: { id: id },
      data: { nombre, imagen: imagenThumbnail, icono: iconoThumbnail },
    });
    res.json({ mensaje: "Tipo de propiedad actualizado" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error al actualizar el tipo de propiedad" });
  }
};

export const deleteTipoPropiedad = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tipoPropiedadActual = await prisma.tipoPropiedad.findUnique({
      where: { id: id },
      select: { imagen: true, icono: true },
    });
    if (tipoPropiedadActual?.imagen) {
      const imagenPath = path.join(
        __dirname,
        "../../public",
        tipoPropiedadActual.imagen
      );

      fs.unlink(imagenPath, (err) => {
        if (err) {
          console.error("Error eliminando la imagen:", err);
        }
      });
    }

    if (tipoPropiedadActual?.icono) {
      const imagenPath = path.join(
        __dirname,
        "../../public",
        tipoPropiedadActual.icono
      );

      fs.unlink(imagenPath, (err) => {
        if (err) {
          console.error("Error eliminando el icono:", err);
        }
      });
    }
    await prisma.tipoPropiedad.delete({
      where: { id: id },
    });
    res.json({ mensaje: "Tipo de propiedad eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el tipo de propiedad" });
  }
};
