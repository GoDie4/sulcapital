"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/ubicaciones.ts
const express_1 = require("express");
const uploadImage_1 = require("../middlewares/images/uploadImage");
const path_1 = __importDefault(require("path"));
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const banners_controller_1 = require("../controllers/banners.controller");
const router = (0, express_1.Router)();
const UPLOAD_DIR = path_1.default.resolve(__dirname, "../../public/banners");
router.get("/", banners_controller_1.getAllBanners);
router.post("/agregar", JWTMiddleware_1.verifyAdmin, uploadImage_1.upload.fields([{ name: "imagen", maxCount: 1 }]), (0, uploadImage_1.handleImageUpload)("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "banner",
    thumbnailSize: { width: 4000, height: 2000 },
}), banners_controller_1.createBanner);
router.put("/editar/:id", JWTMiddleware_1.verifyAdmin, uploadImage_1.upload.fields([{ name: "imagen", maxCount: 1 }]), (0, uploadImage_1.handleImageUpload)("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "bannner",
    thumbnailSize: { width: 4000, height: 2000 },
}), banners_controller_1.updateBanner);
router.delete("/eliminar/:id", JWTMiddleware_1.verifyAdmin, banners_controller_1.deleteBanner);
exports.default = router;
//# sourceMappingURL=banners.routes.js.map