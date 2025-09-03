import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
const prisma = new PrismaClient();

export const getCiudades = async (req: any, res: any) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const search = (req.query.search as string)?.trim() || "";

  const skip = (page - 1) * limit;
  const searchLower = search.toLowerCase();

  const whereConditions: any = {};

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
  } catch (error: any) {
    console.error(error);
   

    res.status(500).json({ message: "Error al obtener las ciudades" });
  } finally {
    await prisma.$disconnect();
  }
};

export const createCiudad = async (req: Request, res: Response) => {
  const { nombre, descripcion, imagenThumbnail, coordenadas } = req.body;
  try {
    await prisma.ciudades.create({
      data: { nombre, descripcion, coordenadas, imagen: imagenThumbnail },
    });
    res.status(201).json({ mensaje: "Ciudad agregada correctamente" });
  } catch (error: any) {
    console.error(error);
   

    res.status(500).json({ message: "Error al crear la ciudad" });
  }
};

export const updateCiudad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion, imagenThumbnail, coordenadas } = req.body;

  try {
    const ciudadActual = await prisma.ciudades.findUnique({
      where: { id: Number(id) },
      select: { imagen: true },
    });
    if (ciudadActual?.imagen) {
      const imagenPath = path.join(
        __dirname,
        "../../public",
        ciudadActual.imagen
      );

      fs.unlink(imagenPath, (err) => {
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
  } catch (error: any) {
    console.error(error);
   

    res.status(500).json({ message: "Error al actualizar la ciudad" });
  }
};

export const deleteCiudad = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const ciudadActual = await prisma.ciudades.findUnique({
      where: { id: Number(id) },
      select: { imagen: true },
    });
    if (ciudadActual?.imagen) {
      const imagenPath = path.join(
        __dirname,
        "../../public",
        ciudadActual.imagen
      );

      fs.unlink(imagenPath, (err) => {
        if (err) {
          console.error("Error eliminando la imagen:", err);
        }
      });
    }
    await prisma.ciudades.delete({
      where: { id: Number(id) },
    });
    res.json({ mensaje: "Ciudad eliminada correctamente" });
  } catch (error: any) {
    console.error(error);
   

    res.status(500).json({ message: "Error al eliminar la ciudad" });
  }
};
