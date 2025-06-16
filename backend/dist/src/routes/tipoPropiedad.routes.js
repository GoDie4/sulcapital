"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/ubicaciones.ts
const express_1 = require("express");
const uploadImage_1 = require("../middlewares/images/uploadImage");
const path_1 = __importDefault(require("path"));
const tipoPropiedades_controller_1 = require("../controllers/tipoPropiedades.controller");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const router = (0, express_1.Router)();
const UPLOAD_DIR = path_1.default.resolve(__dirname, "../../public/tipo_propiedades");
router.get("/", tipoPropiedades_controller_1.getTiposPropiedades);
router.post("/agregar", JWTMiddleware_1.verifyAdmin, uploadImage_1.upload.fields([
    { name: "imagen", maxCount: 1 },
    { name: "icono", maxCount: 1 },
]), (0, uploadImage_1.handleImageUpload)("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "tipo_propiedad",
    thumbnailSize: { width: 550, height: 768 },
}), (0, uploadImage_1.handleImageUpload)("icono", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "tipo_propiedad",
    thumbnailSize: { width: 64, height: 64 },
}), tipoPropiedades_controller_1.createTipoPropiedad);
router.put("/editar/:id", JWTMiddleware_1.verifyAdmin, uploadImage_1.upload.fields([
    { name: "imagen", maxCount: 1 },
    { name: "icono", maxCount: 1 },
]), (0, uploadImage_1.handleImageUpload)("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "tipo_propiedad",
    thumbnailSize: { width: 550, height: 768 },
}), (0, uploadImage_1.handleImageUpload)("icono", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "tipo_propiedad",
    thumbnailSize: { width: 64, height: 64 },
}), tipoPropiedades_controller_1.updateTipoPropiedad);
router.delete("/eliminar/:id", JWTMiddleware_1.verifyAdmin, tipoPropiedades_controller_1.deleteTipoPropiedad);
exports.default = router;
//# sourceMappingURL=tipoPropiedad.routes.js.map