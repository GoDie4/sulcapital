// src/middlewares/uploadImage.ts
import multer from "multer";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs/promises";

// Configuración de Multer: usamos memoryStorage para procesar con Sharp
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Función para procesar y guardar imágenes + miniatura
export function handleImageUpload(
  fieldName: string,
  opts: {
    uploadDir: string; // carpeta donde guardar
    filePrefix?: string; // prefijo de nombre (por ej. 'ubicacion')
    thumbnailSize?: { width: number; height: number };
  }
) {
  const {
    uploadDir,
    filePrefix = "",
    thumbnailSize = { width: 120, height: 120 },
  } = opts;

  // Asegurarse de que exista la carpeta
  fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

  return async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const fileField = files[fieldName]?.[0];
    if (!fileField) return next();

    // Extensión original
    const ext = path.extname(fileField.originalname).toLowerCase();
    const baseName = `${filePrefix}-${Date.now()}`;

    // Nombres de salida
    const originalName = `${baseName}${ext}`;
    const thumbName = `${baseName}-${fieldName}${ext}`;

    try {
      // Guardar original
    //   await sharp(file.buffer).toFile(path.join(uploadDir, originalName));

      // Generar y guardar miniatura
      await sharp(fileField.buffer)
        .resize(thumbnailSize.width, thumbnailSize.height)
        .toFile(path.join(uploadDir, thumbName));

      // Inyectar rutas en req.body (o donde prefieras)
      const relativePath = uploadDir.split('public')[1].replace(/\\/g, '/');

      req.body[`${fieldName}`]          = `${relativePath}/${originalName}`;
      req.body[`${fieldName}Thumbnail`] = `${relativePath}/${thumbName}`;

      next();
    } catch (err) {
      console.error("Error al procesar imagen:", err);
      res.status(500).json({ message: "Error al procesar la imagen" });
    }
  };
}
