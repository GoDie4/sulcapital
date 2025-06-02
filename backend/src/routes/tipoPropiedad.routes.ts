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

const router = Router();
const UPLOAD_DIR = path.resolve(__dirname, "../../public/tipo_propiedades");

router.get("/", getTiposPropiedades);

router.post(
  "/agregar",
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

router.delete("/eliminar/:id", deleteTipoPropiedad);

export default router;
