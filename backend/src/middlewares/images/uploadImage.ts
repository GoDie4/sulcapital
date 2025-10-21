// src/middlewares/uploadImage.ts
import multer from "multer";
// import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs/promises";

// Configuración de Multer: usamos memoryStorage para procesar con Sharp
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: { fieldSize: 10 * 1024 * 1024 },
});

// Función para procesar y guardar imágenes + miniatura
export function handleImageUpload(
  fieldName: string,
  opts: {
    uploadDir: string; // carpeta donde guardar
    filePrefix?: string;
    // thumbnailSize?: { width: number; height: number };
  }
) {
  const {
    uploadDir,
    filePrefix = "",
    // thumbnailSize = { width: 120, height: 120 },
  } = opts;

  // Asegurarse de que exista la carpeta
  fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

  return async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const fileField = files[fieldName]?.[0];
    if (!fileField) return next();

    try {
      const baseName = `${filePrefix}-${Date.now()}`;
      const finalName = `${baseName}-imagen.webp`;
      const finalPath = path.join(uploadDir, finalName);

      await fs.writeFile(finalPath, fileField.buffer);

      // Inyectar la ruta relativa en req.body para el controlador
      const relativePath = uploadDir.split("public")[1].replace(/\\/g, "/");
      req.body[`${fieldName}Thumbnail`] = `${relativePath}/${finalName}`;

      next();
    } catch (err) {
      console.error("Error al procesar imagen:", err);
      res.status(500).json({ message: "Error al procesar la imagen" });
    }
  };
}
