import { Router } from "express";
import { validateSchema } from "../middlewares/validatorSchemas.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { login, logout, register } from "../controllers/auth.controller";

const router = Router();

router.post("/login", validateSchema(loginSchema), login);
router.post("/registro", validateSchema(registerSchema), register);

router.post("/logout", logout);
export default router;
