import bcrypt from "bcrypt";
import prisma from "../config/database";
import { Request, Response } from "express";

export const getUsuarios = async (req: any, res: any) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const search = (req.query.search as string)?.trim() || "";

  const skip = (page - 1) * limit;
  const searchLower = search.toLowerCase();

  const rol = (req.query.rol as string)?.trim() || "";
  const estado = (req.query.estado as string)?.trim() || "";
  const publicaciones = (req.query.cant_publicaciones as string)?.trim() || "";

  const whereConditions: any = {};
  if (rol) {
    whereConditions.rol = {
      nombre: {
        contains: rol,
      },
    };
  }

  if (estado) {
    whereConditions.activo = estado === "1" ? true : false;
  }

  if (searchLower) {
    whereConditions.OR = [
      { nombres: { contains: searchLower } },
      { apellidos: { contains: searchLower } },
      { email: { contains: searchLower } },
      { celular: { contains: searchLower } },
    ];
  }

  try {
    let usuarios = await prisma.usuario.findMany({
      skip,
      take: limit,
      where: whereConditions,
      include: {
        rol: true,
        Propiedad: {
          select: {
            id: true,
          },
        },
      },
    });

    // Ordenamos según publicaciones si se solicita
    if (publicaciones === "1") {
      usuarios = usuarios.sort(
        (a, b) => b.Propiedad.length - a.Propiedad.length
      ); // Mayor a menor
    } else if (publicaciones === "0") {
      usuarios = usuarios.sort(
        (a, b) => a.Propiedad.length - b.Propiedad.length
      ); // Menor a mayor
    }

    const total = await prisma.usuario.count({ where: whereConditions });

    res.json({
      data: usuarios.map((usuario) => ({
        ...usuario,
        cant_publicaciones: usuario.Propiedad.length,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  } finally {
    await prisma.$disconnect();
  }
};
export const getUltimosUsuarios = async (req: any, res: any) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        rol: true,
        Propiedad: true,
      },
      omit: {
        password: true,
      },
    });

    res.json({ data: usuarios });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  } finally {
    await prisma.$disconnect();
  }
};

export const profile = async (req: any, res: any) => {
  const { userId } = req.body;

  try {
    const user = await prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(400).json({ message: "El usuario no existe" });

    return res.status(201).json({
      message: "Solicitud exitosa",
      usuario: {
        id: user.id,
        nombres: user.nombres,
        email: user.email,
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error interno del servidor.", error: error.message });
  }
};

export const yo = async (req: any, res: any) => {
  const userId = req.user?.id;

  try {
    const userEncontrado = await prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!userEncontrado)
      return res.status(400).json({ message: "El usuario no existe" });

    return res.status(201).json({
      message: "Solicitud exitosa",
      usuario: {
        id: userEncontrado.id,
        nombres: userEncontrado.nombres,
        apellidos: userEncontrado.apellidos,
        celular: userEncontrado.celular,
        avatarUrl: userEncontrado.avatarUrl,
        provider: userEncontrado.provider,
        email: userEncontrado.email,
        rol_id: userEncontrado.rol_id,
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error interno del servidor.", error: error.message });
  }
};

export const editarPerfil = async (req: any, res: any) => {
  const userId = req.user?.id;
  const { nombres, apellidos, celular } = req.body;

  try {
    if (!nombres || !apellidos || !celular) {
      return res
        .status(400)
        .json({ error: "Falta nombres, apellidos o celular son obligatorios" });
    }

    const usuarioActualizado = await prisma.usuario.update({
      where: { id: userId },
      data: {
        nombres,
        apellidos,
        celular,
      },
    });

    res.json({
      message: "Perfil actualizado correctamente",
      usuario: usuarioActualizado,
    });
  } catch (error: any) {
    console.error("Error al actualizar perfil:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const cambiarContrasenaPerfil = async (req: any, res: any) => {
  const { newPassword } = req.body;
  const userId = req.user?.id;

  try {
    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.usuario.update({
      where: { id: userId },
      data: { password: hashed },
    });

    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (error: any) {
    console.error("Error al actualizar perfil:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    prisma.$disconnect();
  }
};

export const getDecodedUser = async (
  req: Request,
  res: Response
): Promise<any | undefined> => {
  try {
    const user = (req as any).user;

    if (!user) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado en la solicitud." });
    }
    return res.status(200).json(user);
  } catch (error: any) {
    console.error("Error al obtener usuario decodificado:", error);
    return res
      .status(500)
      .json({ message: "Error interno del servidor.", error: error.message });
  } finally {
    prisma.$disconnect();
  }
};

export const actualizarPublicacionesAutomaticas = async (
  req: any,
  res: any
) => {
  const { id, valor } = req.body;

  if (!id || (valor !== "si" && valor !== "no")) {
    return res.status(400).json({ message: "Datos inválidos" });
  }

  try {
    const usuario = await prisma.usuario.update({
      where: { id },
      data: {
        publicaciones_automaticas: valor === "si",
      },
    });

    res.json({
      mensaje:
        valor === "si"
          ? "Habilitado correctamente"
          : "Deshabilitado correctamente",
      data: usuario,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  } finally {
    await prisma.$disconnect();
  }
};
