import { getEmpresaContacto, upsertEmpresaContacto } from "../controllers/contacto.controller";
import { Router } from "express";
import { verifyAdmin } from "../middlewares/JWTMiddleware";

const router = Router();

router.get("/", getEmpresaContacto);
router.post("/", verifyAdmin, upsertEmpresaContacto);

export default router;
