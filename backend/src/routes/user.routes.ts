import { authRequired } from "../middlewares/validateToken";
import { getDecodedUser, profile, yo } from "../controllers/user.controller";
import { Router } from "express";
import { addUserReq, verifyAdmin } from "../middlewares/JWTMiddleware";

const router = Router();

router.get("", verifyAdmin, getDecodedUser);
router.get("/perfil/:userId", authRequired, profile);
router.get("/yo", addUserReq, yo);

export default router;
