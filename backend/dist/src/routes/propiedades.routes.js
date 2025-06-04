"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propiedades_controller_1 = require("../controllers/propiedades.controller");
const path_1 = __importDefault(require("path"));
const uploadMultiplesImages_1 = require("../middlewares/images/uploadMultiplesImages");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const router = (0, express_1.Router)();
const UPLOAD_DIR = path_1.default.resolve(__dirname, "../../public/propiedades");
router.get("/", propiedades_controller_1.getPropiedades);
router.get("/byUser", JWTMiddleware_1.addUserReq, propiedades_controller_1.getPropiedadesByUser);
router.get("/buscar", propiedades_controller_1.buscarPropiedades);
router.get("/find/:id", propiedades_controller_1.getPropiedadById);
router.post("/agregar", uploadMultiplesImages_1.upload.fields([
    { name: "imagenes", maxCount: 6 },
    { name: "fondoPortada", maxCount: 1 },
]), (0, uploadMultiplesImages_1.handleMultipleImagesUpload)("imagenes", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "foto",
    thumbnailSize: { width: 1000, height: 667 },
}), (0, uploadMultiplesImages_1.handleMultipleImagesUpload)("fondoPortada", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "portada",
    thumbnailSize: { width: 554, height: 360 },
}), propiedades_controller_1.crearPropiedad);
router.put("/editar/:id", uploadMultiplesImages_1.upload.fields([
    { name: "imagenes", maxCount: 6 },
    { name: "fondoPortada", maxCount: 1 },
]), (0, uploadMultiplesImages_1.handleMultipleImagesUpload)("imagenes", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "foto",
    thumbnailSize: { width: 1000, height: 667 },
}), (0, uploadMultiplesImages_1.handleMultipleImagesUpload)("fondoPortada", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "portada",
    thumbnailSize: { width: 554, height: 360 },
}), propiedades_controller_1.editarPropiedad);
router.delete("/eliminar/:id", propiedades_controller_1.eliminarPropiedad);
exports.default = router;
//# sourceMappingURL=propiedades.routes.js.map