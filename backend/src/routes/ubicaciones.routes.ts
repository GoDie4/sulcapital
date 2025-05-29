// routes/ubicaciones.ts
import { Router } from "express";
import {
  createUbicacion,
  deleteUbicacion,
  getUbicaciones,
  updateUbicacion,
} from "../controllers/ubicaciones.controller";
import { handleImageUpload, upload } from "../middlewares/images/uploadImage";
import path from "path";

const router = Router();
const UPLOAD_DIR = path.resolve(__dirname, "../public/ubicaciones");

// Listar
router.get("/", getUbicaciones);

// Crear con imagen
router.post(
  "/agregar",
  upload.single("imagen"),
  handleImageUpload("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "ubicacion",
    thumbnailSize: { width: 120, height: 120 },
  }),
  createUbicacion
);

// Actualizar con posible nueva imagen
router.put(
  "/editar/:id",
  upload.single("imagen"),
  handleImageUpload("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "ubicacion",
    thumbnailSize: { width: 120, height: 120 },
  }),
  updateUbicacion
);

// Eliminar
router.delete("/eliminar/:id", deleteUbicacion);

export default router;
