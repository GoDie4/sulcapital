// routes/ubicaciones.ts
import { Router } from "express";

import { handleImageUpload, upload } from "../middlewares/images/uploadImage";
import path from "path";
import {
  createTipoPropiedad,
  deleteTipoPropiedad,
  getTiposPropiedades,
  updateTipoPropiedad,
} from "../controllers/tipoPropiedades.controller";
import { verifyAdmin } from "../middlewares/JWTMiddleware";

const router = Router();
const UPLOAD_DIR = path.join(process.cwd(), "public", "tipo_propiedades");


router.get("/", getTiposPropiedades);

router.post(
  "/agregar",
  verifyAdmin,
  upload.fields([
    { name: "imagen", maxCount: 1 },
    { name: "icono", maxCount: 1 },
  ]),
  handleImageUpload("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "tipo_propiedad",
    thumbnailSize: { width: 550, height: 768 },
  }),
  handleImageUpload("icono", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "tipo_propiedad",
    thumbnailSize: { width: 64, height: 64 },
  }),
  createTipoPropiedad
);

router.put(
  "/editar/:id",
  verifyAdmin,
  upload.fields([
    { name: "imagen", maxCount: 1 },
    { name: "icono", maxCount: 1 },
  ]),
  handleImageUpload("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "tipo_propiedad",
    thumbnailSize: { width: 550, height: 768 },
  }),
  handleImageUpload("icono", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "tipo_propiedad",
    thumbnailSize: { width: 64, height: 64 },
  }),
  updateTipoPropiedad
);

router.delete("/eliminar/:id", verifyAdmin, deleteTipoPropiedad);

export default router;
