// routes/ubicaciones.ts
import { Router } from "express";

import { handleImageUpload, upload } from "../middlewares/images/uploadImage";
import path from "path";
import {
  createCiudad,
  deleteCiudad,
  getCiudades,
  updateCiudad,
} from "../controllers/ciudades.controller";

const router = Router();
const UPLOAD_DIR = path.resolve(__dirname, "../../public/ciudades");

// Listar
router.get("/", getCiudades);

// Crear con imagen
router.post(
  "/agregar",
  upload.fields([{ name: "imagen", maxCount: 1 }]),
  handleImageUpload("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "ciudad",
    thumbnailSize: { width: 120, height: 120 },
  }),
  createCiudad
);

// Actualizar con posible nueva imagen
router.put(
  "/editar/:id",
  upload.fields([{ name: "imagen", maxCount: 1 }]),
  handleImageUpload("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "ciudad",
    thumbnailSize: { width: 120, height: 120 },
  }),
  updateCiudad
);

// Eliminar
router.delete("/eliminar/:id", deleteCiudad);

export default router;
