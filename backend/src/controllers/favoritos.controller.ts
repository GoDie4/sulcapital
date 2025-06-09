import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFavoritosByUser = async (req: any, res: any): Promise<any> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 100;
  const search = (req.query.search as string)?.trim() || "";
  const skip = (page - 1) * limit;
  const searchLower = search.toLowerCase();

  const user = req.user as { id: string; rol_id: string | number };
  if (!user) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  const whereConditions: any = {
    Favorito: {
      some: {
        userId: user.id,
      },
    },
  };

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
          tipoPropiedad: { select: { nombre: true, id: true } },
          ciudad: true,
          imagenes: {
            select: { id: true, url: true },
            orderBy: { id: "asc" },
          },
          fondoPortada: {
            select: { id: true, url: true },
            orderBy: { id: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.propiedad.count({
        where: whereConditions,
      }),
    ]);

    // Retornar resultados con `esFavorito: true` ya que son favoritos confirmados
    const propiedadesConFavorito = propiedades.map((prop) => ({
      ...prop,
      esFavorito: true,
    }));

    res.json({
      data: propiedadesConFavorito,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener favoritos" });
  } finally {
    await prisma.$disconnect();
  }
};

export const agregarFavorito = async (req: any, res: any) => {
  const { propiedadId } = req.body;
  const userId = req.user?.id;

  if (!userId || !propiedadId) {
    return res.status(400).json({ message: "Datos faltantes" });
  }

  try {
    await prisma.favorito.create({
      data: {
        userId,
        propiedadId,
      },
    });

    return res.status(201).json({ mensaje: "Agregado a favoritos" });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Ya está en favoritos" });
    }
    console.error(error);
    return res.status(500).json({ message: "Error al agregar favorito" });
  }
};

export const eliminarFavorito = async (req: any, res: any) => {
  const { propiedadId } = req.body;
  const userId = req.user?.id;

  if (!userId || !propiedadId) {
    return res.status(400).json({ message: "Datos faltantes" });
  }

  try {
    await prisma.favorito.delete({
      where: {
        userId_propiedadId: {
          userId,
          propiedadId,
        },
      },
    });

    return res.status(200).json({ mensaje: "Eliminado de favoritos" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar favorito" });
  }
};
