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
  } catch (error: any) {
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
  } catch (error: any) {
    console.error(error);
   

    res.status(500).json({ message: "Error al crear el tipo de propiedad" });
  }
};

export const updateTipoPropiedad = async (req: any, res: any) => {
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
    const dataToUpdate: {
      nombre?: string;
      imagen?: string;
      icono?: string;
    } = {};

    // Siempre actualizamos el nombre (puede venir undefined si no se incluyó, en ese caso no lo agregamos)
    if (typeof nombre === "string") {
      dataToUpdate.nombre = nombre;
    }

    // 3) Si llega una nueva imagenThumbnail, borramos la anterior y anotamos la nueva ruta
    if (typeof imagenThumbnail === "string" && imagenThumbnail.trim() !== "") {
      if (tipoPropiedadActual.imagen) {
        const rutaViejaImagen = path.join(
          __dirname,
          "../../public",
          tipoPropiedadActual.imagen
        );
        fs.unlink(rutaViejaImagen, (err) => {
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
        const rutaViejaIcono = path.join(
          __dirname,
          "../../public",
          tipoPropiedadActual.icono
        );
        fs.unlink(rutaViejaIcono, (err) => {
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
  } catch (error: any) {
    console.error(error);
   

    return res
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
  } catch (error: any) {
    console.error(error);
   

    res.status(500).json({ message: "Error al eliminar el tipo de propiedad" });
  }
};
