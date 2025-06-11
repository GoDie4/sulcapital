import { Router } from "express";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import {
  loginSchema,
  recuperarSchema,
  registerSchema,
} from "../schemas/auth.schema";
import {
    googleAuth,
  login,
  logout,
  recuperarContrasena,
  register,
} from "../controllers/auth.controller";
import {
  getUltimosUsuarios,
  getUsuarios,
} from "../controllers/user.controller";
import { verifyAdmin } from "../middlewares/JWTMiddleware";

const router = Router();

router.get("/listar-usuarios", getUsuarios);
router.get("/ultimosUsuarios", verifyAdmin, getUltimosUsuarios);

router.post("/login", validateSchema(loginSchema), login);
router.post("/registro", validateSchema(registerSchema), register);
router.post("/recuperar", validateSchema(recuperarSchema), recuperarContrasena);
router.post('/auth/google', googleAuth);
router.post("/logout", logout);
export default router;
