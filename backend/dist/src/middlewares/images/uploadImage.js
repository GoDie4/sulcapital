"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
exports.handleImageUpload = handleImageUpload;
// src/middlewares/uploadImage.ts
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
// Configuración de Multer: usamos memoryStorage para procesar con Sharp
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
// Función para procesar y guardar imágenes + miniatura
function handleImageUpload(fieldName, opts) {
    const { uploadDir, filePrefix = "", thumbnailSize = { width: 120, height: 120 }, } = opts;
    // Asegurarse de que exista la carpeta
    promises_1.default.mkdir(uploadDir, { recursive: true }).catch(console.error);
    return async (req, res, next) => {
        const files = req.files;
        const fileField = files[fieldName]?.[0];
        if (!fileField)
            return next();
        // Extensión original
        const ext = path_1.default.extname(fileField.originalname).toLowerCase();
        const baseName = `${filePrefix}-${Date.now()}`;
        // Nombres de salida
        const originalName = `${baseName}${ext}`;
        const thumbName = `${baseName}-${fieldName}${ext}`;
        try {
            // Guardar original
            //   await sharp(file.buffer).toFile(path.join(uploadDir, originalName));
            // Generar y guardar miniatura
            await (0, sharp_1.default)(fileField.buffer)
                .resize(thumbnailSize.width, thumbnailSize.height)
                .toFile(path_1.default.join(uploadDir, thumbName));
            // Inyectar rutas en req.body (o donde prefieras)
            const relativePath = uploadDir.split('public')[1].replace(/\\/g, '/');
            req.body[`${fieldName}`] = `${relativePath}/${originalName}`;
            req.body[`${fieldName}Thumbnail`] = `${relativePath}/${thumbName}`;
            next();
        }
        catch (err) {
            console.error("Error al procesar imagen:", err);
            res.status(500).json({ message: "Error al procesar la imagen" });
        }
    };
}
//# sourceMappingURL=uploadImage.js.map