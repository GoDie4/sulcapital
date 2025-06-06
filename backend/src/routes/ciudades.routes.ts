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
import { verifyAdmin } from "../middlewares/JWTMiddleware";

const router = Router();
const UPLOAD_DIR = path.resolve(__dirname, "../../public/ciudades");

router.get("/", getCiudades);

// Crear con imagen
router.post(
  "/agregar",
  verifyAdmin,
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
  verifyAdmin,
  upload.fields([{ name: "imagen", maxCount: 1 }]),
  handleImageUpload("imagen", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "ciudad",
    thumbnailSize: { width: 120, height: 120 },
  }),
  updateCiudad
);

// Eliminar
router.delete("/eliminar/:id", verifyAdmin, deleteCiudad);

export default router;
