"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
exports.handleMultipleImagesUpload = handleMultipleImagesUpload;
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
// Configuración de Multer: usamos memoryStorage para procesar con Sharp
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
function handleMultipleImagesUpload(fieldName, opts) {
    const { uploadDir, filePrefix = "", thumbnailSize = { width: 120, height: 120 }, } = opts;
    promises_1.default.mkdir(uploadDir, { recursive: true }).catch(console.error);
    return async (req, res, next) => {
        const files = req.files;
        const fileFields = files[fieldName];
        if (!fileFields || fileFields.length === 0)
            return next();
        const relativePath = uploadDir.split("public")[1]?.replace(/\\/g, "/");
        const imagePaths = [];
        try {
            for (const file of fileFields) {
                const ext = path_1.default.extname(file.originalname).toLowerCase();
                const baseName = `${filePrefix}-${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                //const originalName = `${baseName}${ext}`;
                const thumbName = `${baseName}-${fieldName}${ext}`;
                // Procesar y guardar la miniatura (o la imagen original si quieres)
                await (0, sharp_1.default)(file.buffer)
                    .resize(thumbnailSize.width, thumbnailSize.height)
                    .toFile(path_1.default.join(uploadDir, thumbName));
                // Guardar la ruta (puedes usar originalName si quieres la original también)
                imagePaths.push(`${relativePath}/${thumbName}`);
            }
            // Inyecta las rutas en req.body como array
            req.body[`${fieldName}`] = imagePaths;
            next();
        }
        catch (err) {
            console.error("Error al procesar múltiples imágenes:", err);
            res.status(500).json({ message: "Error al procesar las imágenes" });
        }
    };
}
//# sourceMappingURL=uploadMultiplesImages.js.map