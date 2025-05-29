import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUbicaciones = async (req: Request, res: Response) => {
  try {
    const ubicaciones = await prisma.ubicaciones.findMany();
    res.json(ubicaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las ubicaciones" });
  }
};

export const createUbicacion = async (req: Request, res: Response) => {
  const { nombre, descripcion, imagenThumbnail } = req.body;
  try {
    const nueva = await prisma.ubicaciones.create({
      data: { nombre, descripcion, imagen: imagenThumbnail },
    });
    res.status(201).json(nueva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la ubicación" });
  }
};

export const updateUbicacion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen } = req.body;

  try {
    const ubicacionActualizada = await prisma.ubicaciones.update({
      where: { id: Number(id) },
      data: { nombre, descripcion, imagen },
    });
    res.json(ubicacionActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la ubicación" });
  }
};

export const deleteUbicacion = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.ubicaciones.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Ubicación eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la ubicación" });
  }
};
