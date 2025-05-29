import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCiudades = async (req: Request, res: Response) => {
  try {
    const ciudades = await prisma.ciudades.findMany();
    res.json(ciudades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las ciudades" });
  }
};

export const createCiudad = async (req: Request, res: Response) => {
  const { nombre, descripcion, imagenThumbnail, coordenadas } = req.body;
  try {
    await prisma.ciudades.create({
      data: { nombre, descripcion, coordenadas, imagen: imagenThumbnail },
    });
    res.status(201).json({ mensaje: "Ciudad agregada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la ciudad" });
  }
};

export const updateCiudad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, descripcion, imagen } = req.body;

  try {
    const ciudadActualizada = await prisma.ciudades.update({
      where: { id: Number(id) },
      data: { nombre, descripcion, imagen },
    });
    res.json(ciudadActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la ciudad" });
  }
};

export const deleteCiudad = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.ciudades.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Ciudad eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la ciudad" });
  }
};
