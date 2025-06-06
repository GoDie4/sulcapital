import { Router } from "express";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import {
  loginSchema,
  recuperarSchema,
  registerSchema,
} from "../schemas/auth.schema";
import {
  login,
  logout,
  recuperarContrasena,
  register,
} from "../controllers/auth.controller";
import { getUsuarios } from "../controllers/user.controller";

const router = Router();

router.get("/listar-usuarios",  getUsuarios);

router.post("/login", validateSchema(loginSchema), login);
router.post("/registro", validateSchema(registerSchema), register);
router.post("/recuperar", validateSchema(recuperarSchema), recuperarContrasena);

router.post("/logout", logout);
export default router;
