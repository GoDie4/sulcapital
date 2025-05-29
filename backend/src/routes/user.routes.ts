import { authRequired } from "../middlewares/validateToken";
import {
  getDecodedUser,
  profile,
} from "../controllers/user.controller";
import { Router } from "express";
import { verifyAdmin } from "../middlewares/JWTMiddleware";

const router = Router();

router.get("", verifyAdmin, getDecodedUser);
router.get("/perfil/:userId", authRequired, profile);
router.get("/yo", verifyAdmin, getDecodedUser);

export default router;
