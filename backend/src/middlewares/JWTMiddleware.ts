import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

import { ENV } from "../config/config";
import prisma from "../config/database";

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
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
};

export const verifyAlumno = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const tokenFromCookie = req.cookies?.token;
  const token = tokenFromCookie;

  console.log("Cookies:", req.cookies?.token);

  console.log("BODY: ", req.body);
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
      res.status(403).json({ message: "No tienes permisos de alumno." });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
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
  } catch (error: any) {
    console.error("Error en attachUser middleware:", error);
    return res
      .status(500)
      .json({ message: "Error al autenticar usuario.", error: error.message });
  }
};
