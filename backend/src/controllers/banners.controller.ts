import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const getAllBanners = async (_req: Request, res: Response) => {
  try {
    const banners = await prisma.bannersWeb.findMany({
      orderBy: { posicion: "asc" },
    });
    res.json(banners);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener los banners", error: err });
  }
};

export const getBannerById = async (req: Request, res: Response): Promise<any> => {
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
  const { titulo, descripcion, imagen, posicion } = req.body;
  try {
    const newBanner = await prisma.bannersWeb.create({
      data: { titulo, descripcion, imagen, posicion },
    });
    res.status(201).json(newBanner);
  } catch (err) {
    res.status(500).json({ message: "Error al crear el banner", error: err });
  }
};

export const updateBanner = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, descripcion, imagen, posicion } = req.body;
  try {
    const updated = await prisma.bannersWeb.update({
      where: { id },
      data: { titulo, descripcion, imagen, posicion },
    });
    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar el banner", error: err });
  }
};

export const deleteBanner = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.bannersWeb.delete({ where: { id } });
    res.json({ message: "Banner eliminado correctamente" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el banner", error: err });
  }
};
