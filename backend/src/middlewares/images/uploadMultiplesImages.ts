import multer from "multer";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs/promises";

// Configuración de Multer: usamos memoryStorage para procesar con Sharp
const storage = multer.memoryStorage();
export const upload = multer({ storage });
export function handleMultipleImagesUpload(
  fieldName: string,
  opts: {
    uploadDir: string;
    filePrefix?: string;
    thumbnailSize?: { width: number; height: number };
  }
) {
  const {
    uploadDir,
    filePrefix = "",
    thumbnailSize = { width: 120, height: 120 },
  } = opts;

  fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

  return async (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const fileFields = files[fieldName];
    if (!fileFields || fileFields.length === 0) return next();

    const relativePath = uploadDir.split("public")[1]?.replace(/\\/g, "/");
    const imagePaths: string[] = [];

    try {
      for (const file of fileFields) {
        const ext = path.extname(file.originalname).toLowerCase();
        const baseName = `${filePrefix}-${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}`;
        //const originalName = `${baseName}${ext}`;
        const thumbName = `${baseName}-${fieldName}${ext}`;

        // Procesar y guardar la miniatura (o la imagen original si quieres)
        await sharp(file.buffer)
          .resize(thumbnailSize.width, thumbnailSize.height)
          .toFile(path.join(uploadDir, thumbName));

        // Guardar la ruta (puedes usar originalName si quieres la original también)
        imagePaths.push(`${relativePath}/${thumbName}`);
      }

      // Inyecta las rutas en req.body como array
      req.body[`${fieldName}`] = imagePaths;

      next();
    } catch (err) {
      console.error("Error al procesar múltiples imágenes:", err);
      res.status(500).json({ message: "Error al procesar las imágenes" });
    }
  };
}
