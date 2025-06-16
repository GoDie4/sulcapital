import { authRequired } from "../middlewares/validateToken";
import {
  actualizarPublicacionesAutomaticas,
  editarPerfil,
  getDecodedUser,
  profile,
  yo,
} from "../controllers/user.controller";
import { Router } from "express";
import {
  addUserReq,
  verifyAdmin,
  verifyAnuncianteOrCliente,
} from "../middlewares/JWTMiddleware";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import { cambiarContrasena } from "../controllers/auth.controller";
import { cambiarContrasenaSchema } from "../schemas/auth.schema";

const router = Router();

router.get("", verifyAdmin, getDecodedUser);
router.get("/perfil/:userId", authRequired, profile);
router.put("/editarPerfil", verifyAnuncianteOrCliente, editarPerfil);
router.get("/yo", addUserReq, yo);
router.put(
  "/cambiarContrasena",
  validateSchema(cambiarContrasenaSchema),
  cambiarContrasena
);
router.post(
  "/publicaciones-automaticas",
  verifyAdmin,
  actualizarPublicacionesAutomaticas
);

export default router;
