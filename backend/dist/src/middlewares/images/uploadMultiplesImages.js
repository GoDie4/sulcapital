"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMultipleImagesUpload = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Usamos memoryStorage: los archivos vienen en memoria (buffer)
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
const handleMultipleImagesUpload = (fieldName, opts) => {
    const { uploadDir, filePrefix = "" } = opts;
    return async (req, res, next) => {
        try {
            // Asegurar carpeta destino
            if (!fs_1.default.existsSync(uploadDir)) {
                fs_1.default.mkdirSync(uploadDir, { recursive: true });
            }
            // Archivos del campo (ej: "imagenes" o "fondoPortada")
            const files = req.files?.[fieldName];
            if (!files || files.length === 0) {
                // No llegaron archivos en ese campo; no rompemos, seguimos
                return next();
            }
            const processedFiles = [];
            // nombre de la carpeta pública (p.ej. "propiedades")
            const publicFolderName = path_1.default.basename(uploadDir);
            for (const file of files) {
                const ext = path_1.default.extname(file.originalname) || ".jpg";
                const baseName = `${filePrefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
                const filePath = path_1.default.join(uploadDir, baseName);
                // 👉 Guardar el archivo tal cual (SIN sharp)
                await fs_1.default.promises.writeFile(filePath, file.buffer);
                // URL pública (sirve con app.use(express.static("public")))
                processedFiles.push(`/${publicFolderName}/${baseName}`);
            }
            // Dejamos las rutas en req.body[fieldName] para que tu controlador las use
            req.body[fieldName] = processedFiles;
            next();
        }
        catch (err) {
            console.error("Error al procesar múltiples imágenes:", err);
            res
                .status(500)
                .json({ message: "Error al procesar las imágenes", error: String(err) });
        }
    };
};
exports.handleMultipleImagesUpload = handleMultipleImagesUpload;
//# sourceMappingURL=uploadMultiplesImages.js.map