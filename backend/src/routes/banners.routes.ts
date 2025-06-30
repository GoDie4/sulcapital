// routes/ubicaciones.ts
import { Router } from "express";

import { handleImageUpload, upload } from "../middlewares/images/uploadImage";
import path from "path";
import { verifyAdmin } from "../middlewares/JWTMiddleware";
import {
    createBanner,
  deleteBanner,
  getAllBanners,
  updateBanner,
} from "../controllers/banners.controller";

const router = Router();
const UPLOAD_DIR = path.resolve(__dirname, "../../public/banners");

router.get("/", getAllBanners);

router.post(
  "/agregar",
  verifyAdmin,
  upload.fields([{ name: "imagen", maxCount: 1 }]),
  handleImageUpload("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "banner",
    thumbnailSize: { width: 4000, height: 2000 },
  }),
  createBanner
);

router.put(
  "/editar/:id",
  verifyAdmin,
  upload.fields([{ name: "imagen", maxCount: 1 }]),
  handleImageUpload("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "bannner",
    thumbnailSize: { width: 4000, height: 2000 },
  }),
  updateBanner
);

router.delete("/eliminar/:id", verifyAdmin, deleteBanner);

export default router;
