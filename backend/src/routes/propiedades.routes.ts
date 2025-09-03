import { Router } from "express";
import {
  buscarPropiedades,
  cambiarEstadoPropiedad,
  crearPropiedad,
  editarPropiedad,
  eliminarPropiedad,
  enviarConsultaPropiedad,
  getPropiedadById,
  getPropiedades,
  getPropiedadesByUser,
  getPropiedadesByUserFromAdmin,
  getPropiedadesConFavoritos,
  getUltimasPropiedades,
} from "../controllers/propiedades.controller";
import path from "path";
import {
  handleMultipleImagesUpload,
  upload,
} from "../middlewares/images/uploadMultiplesImages";
import {
  addUserReq,
  verifyAdmin,
  verifyAdminAndAnunciante,
} from "../middlewares/JWTMiddleware";

const router = Router();
const UPLOAD_DIR = path.join(process.cwd(), "public", "propiedades");

router.get("/", getPropiedades);
router.get("/ultimos", verifyAdmin, getUltimasPropiedades);
router.post("/enviarConsulta", addUserReq, enviarConsultaPropiedad);
router.get("/propiedadesConFavoritos", addUserReq, getPropiedadesConFavoritos);
router.get("/byUser", addUserReq, getPropiedadesByUser);
router.get("/byUserAdmin/:id", verifyAdmin, getPropiedadesByUserFromAdmin);
router.get("/buscar", buscarPropiedades);
router.get("/find/:id", getPropiedadById);
router.put("/cambiarEstado/:id", verifyAdmin, cambiarEstadoPropiedad);
router.post(
  "/agregar",
  verifyAdminAndAnunciante,
  upload.fields([{ name: "imagenes", maxCount: 6 }]),
  handleMultipleImagesUpload("imagenes", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "foto",
  }),
  crearPropiedad
);
router.put(
  "/editar/:id",
  verifyAdminAndAnunciante,
  upload.fields([{ name: "imagenes", maxCount: 6 }]),
  handleMultipleImagesUpload("imagenes", {
    uploadDir: UPLOAD_DIR,
    filePrefix: "foto",
  }),
  editarPropiedad
);
router.delete("/eliminar/:id", verifyAdminAndAnunciante, eliminarPropiedad);

export default router;
