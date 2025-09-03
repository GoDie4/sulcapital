import { addUserReq } from "../middlewares/JWTMiddleware";
import {
  agregarFavorito,
  eliminarFavorito,
  getFavoritosByUser,
} from "../controllers/favoritos.controller";
import { Router } from "express";

const router = Router();

router.get("/byUser", addUserReq, getFavoritosByUser);
router.post("/agregar", addUserReq, agregarFavorito);
router.delete("/eliminar", addUserReq, eliminarFavorito);
export default router;
