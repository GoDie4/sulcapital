import {
    getRecientesByUser,
  registrarReciente,
} from "../controllers/vistos.controller";
import { addUserReq } from "../middlewares/JWTMiddleware";

import { Router } from "express";

const router = Router();

router.get("/", addUserReq, getRecientesByUser);
router.post("/agregar", addUserReq, registrarReciente);
export default router;
