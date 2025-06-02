"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/ubicaciones.ts
const express_1 = require("express");
const uploadImage_1 = require("../middlewares/images/uploadImage");
const path_1 = __importDefault(require("path"));
const ciudades_controller_1 = require("../controllers/ciudades.controller");
const router = (0, express_1.Router)();
const UPLOAD_DIR = path_1.default.resolve(__dirname, "../../public/ciudades");
// Listar
router.get("/", ciudades_controller_1.getCiudades);
// Crear con imagen
router.post("/agregar", uploadImage_1.upload.fields([{ name: "imagen", maxCount: 1 }]), (0, uploadImage_1.handleImageUpload)("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "ciudad",
    thumbnailSize: { width: 120, height: 120 },
}), ciudades_controller_1.createCiudad);
// Actualizar con posible nueva imagen
router.put("/editar/:id", uploadImage_1.upload.fields([{ name: "imagen", maxCount: 1 }]), (0, uploadImage_1.handleImageUpload)("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "ciudad",
    thumbnailSize: { width: 120, height: 120 },
}), ciudades_controller_1.updateCiudad);
// Eliminar
router.delete("/eliminar/:id", ciudades_controller_1.deleteCiudad);
exports.default = router;
//# sourceMappingURL=ciudades.routes.js.map