import multer from "multer";
import path from "path";
import fs from "fs";
import { RequestHandler } from "express";

interface UploadOptions {
  uploadDir: string; // Debe ser ruta absoluta hacia /public/<carpeta>
  filePrefix?: string;
  // thumbnailSize?: { width: number; height: number }; // ← ya no se usa
}

const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

export const handleMultipleImagesUpload = (
  fieldName: string,
  opts: UploadOptions
): RequestHandler => {
  const { uploadDir, filePrefix = "" } = opts;

  return async (req, res, next) => {
    try {
      // Asegurar carpeta destino
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Archivos del campo (ej: "imagenes" o "fondoPortada")
      const files = (req.files as Record<string, Express.Multer.File[]>)?.[
        fieldName
      ];

      if (!files || files.length === 0) {
        // No llegaron archivos en ese campo; no rompemos, seguimos
        return next();
      }

      const processedFiles: string[] = [];
      // nombre de la carpeta pública (p.ej. "propiedades")
      const publicFolderName = path.basename(uploadDir);

      for (const file of files) {
        // const ext = path.extname(file.originalname) || ".jpg";
        // const baseName = `${filePrefix}-${Date.now()}-${Math.round(
        //   Math.random() * 1e9
        // )}${ext}`;
        const baseName = `${filePrefix}-${Date.now()}-imagen.webp`;

        const filePath = path.join(uploadDir, baseName);

        // 👉 Guardar el archivo tal cual (SIN sharp)
        await fs.promises.writeFile(filePath, file.buffer);

        // URL pública (sirve con app.use(express.static("public")))
        processedFiles.push(`/${publicFolderName}/${baseName}`);
      }

      // Dejamos las rutas en req.body[fieldName] para que tu controlador las use
      (req.body as any)[fieldName] = processedFiles;

      next();
    } catch (err) {
      console.error("Error al procesar múltiples imágenes:", err);
      res.status(500).json({
        message: "Error al procesar las imágenes",
        error: String(err),
      });
    }
  };
};
