import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

import { ENV } from "../config/config";
import prisma from "../config/database";
import createAccessToken from "../utils/jwt";

dotenv.config();

export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any | undefined> => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(
      token ?? "",
      ENV.TOKEN_SECRET as string
    ) as JwtPayload;

    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: { rol: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if (user?.rol_id !== 1) {
      return res
        .status(403)
        .json({ message: "No tienes permisos de administrador." });
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    return res.status(401).json({ message: "Token inválido." });
  }
};

export const verifyAnunciante = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tokenFromCookie = req.cookies?.token;
  const token = tokenFromCookie;

  if (!token) {
    res.status(401).json({ message: "Token no proporcionado." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token ?? "",
      ENV.TOKEN_SECRET as string
    ) as JwtPayload;

    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: { rol: true },
    });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
      return;
    }

    if (user?.rol_id !== 2) {
      res.status(403).json({ message: "No tienes permisos de anunciante." });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ message: "Token inválido." });
    return;
  }
};

export const verifyAdminAndAnunciante = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, ENV.TOKEN_SECRET as string) as JwtPayload;

    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: { rol: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const allowedRoles = [1, 2];
    if (!allowedRoles.includes(user.rol_id)) {
      return res.status(403).json({
        message:
          "Acceso denegado. Se requieren permisos de administrador o anunciante.",
      });
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    console.error("Error al verificar token:", error);
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

export const verifyAnuncianteOrCliente = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, ENV.TOKEN_SECRET as string) as JwtPayload;

    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: { rol: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    const allowedRoles = [2, 3];
    if (!allowedRoles.includes(user.rol_id)) {
      return res.status(403).json({
        message:
          "Acceso denegado. Se requieren permisos de anunciante o cliente",
      });
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    console.error("Error al verificar token:", error);
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

export const verifyCliente = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tokenFromCookie = req.cookies?.token;
  const token = tokenFromCookie;

  if (!token) {
    res.status(401).json({ message: "Token no proporcionado." });
    return;
  }

  try {
    const decoded = jwt.verify(
      token ?? "",
      ENV.TOKEN_SECRET as string
    ) as JwtPayload;

    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id },
      include: { rol: true },
    });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
      return;
    }

    if (user?.rol_id !== 3) {
      res.status(403).json({ message: "No tienes permisos de cliente." });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ message: "Token inválido." });
    return;
  }
};

interface DecodedToken {
  id: string;
}

export const addUserReq = async (req: any, res: any, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token no encontrado en cookies." });
    }

    try {
      // Intentar verificar el token actual
      const decoded = jwt.verify(
        token,
        process.env.TOKEN_SECRET as string
      ) as DecodedToken;

      const user = await prisma.usuario.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado." });
      }

      req.user = user;
      next();
    } catch (tokenError: any) {
      // Si el token expiró, intentar renovar automáticamente
      if (tokenError.name === "TokenExpiredError") {
        try {
          console.log(
            "🔄 Token expirado, intentando renovar automáticamente..."
          );

          // Decodificar el token expirado para obtener el userId (sin verificar)
          const expiredDecoded = jwt.decode(token) as DecodedToken;

          if (!expiredDecoded || !expiredDecoded.id) {
            return res.status(401).json({ message: "Token inválido" });
          }

          // Buscar el usuario y verificar que tenga una sesión válida reciente
          const user = await prisma.usuario.findUnique({
            where: { id: expiredDecoded.id },
          });

          if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
          }

          // Obtener el rol para el nuevo token
          const role = await prisma.rol.findFirst({
            where: { id: user.rol_id },
          });

          // Generar nuevo token con la misma duración que el original
          const newToken = await createAccessToken({
            id: user.id,
            role: role?.nombre !== undefined ? role.nombre : "",
          });

          // Actualizar la cookie con el nuevo token
          // Detectar si era mantenerConexion basado en la duración original
          const shouldMaintainConnection = true; // Por defecto mantener conexión para usuarios regulares

          res.cookie("token", newToken, {
            sameSite: "lax",
            secure: false,
            httpOnly: true,
            domain: process.env.COOKIE_DOMAIN,
            maxAge: shouldMaintainConnection
              ? 30 * 24 * 60 * 60 * 1000
              : 2 * 60 * 60 * 1000,
          });

          console.log(
            "✅ Token renovado automáticamente para usuario:",
            user.id
          );

          req.user = user;
          next();
        } catch (renewError: any) {
          console.error(
            "❌ Error al renovar token automáticamente:",
            renewError
          );
          return res.status(401).json({
            message: "Sesión expirada, inicia sesión nuevamente",
          });
        }
      } else if (tokenError.name === "JsonWebTokenError") {
        // Token completamente inválido
        return res.status(401).json({ message: "Token inválido" });
      } else {
        // Otros errores de token
        return res.status(401).json({ message: "Error de autenticación" });
      }
    }
  } catch (error: any) {
    console.error("Error en attachUser middleware:", error);
    return res
      .status(500)
      .json({ message: "Error al autenticar usuario.", error: error.message });
  }
};
