"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateToken_1 = require("../middlewares/validateToken");
const user_controller_1 = require("../controllers/user.controller");
const express_1 = require("express");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const router = (0, express_1.Router)();
router.get("", JWTMiddleware_1.verifyAdmin, user_controller_1.getDecodedUser);
router.get("/perfil/:userId", validateToken_1.authRequired, user_controller_1.profile);
router.get("/yo", JWTMiddleware_1.verifyAdmin, user_controller_1.getDecodedUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map