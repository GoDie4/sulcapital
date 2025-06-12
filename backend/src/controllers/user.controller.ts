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
  const publicaciones = (req.query.publicaciones as string)?.trim() || "";

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

  if (publicaciones === "1") {
    whereConditions.Propiedad = {
      some: {},
    };
  }
  if (searchLower) {
    whereConditions.OR = [
      { nombre: { contains: searchLower } },
      { correo: { contains: searchLower } },
      { username: { contains: searchLower } },
    ];
  }

  try {
    const [usuarios, total] = await Promise.all([
      prisma.usuario.findMany({
        skip,
        take: limit,
        where: whereConditions,
        include: {
          rol: true,
          Propiedad: true,
        },
        omit: {
          password: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.usuario.count({
        where: whereConditions,
      }),
    ]);

    res.json({
      data: usuarios,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
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
  } catch (error) {
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
