"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vistos_controller_1 = require("../controllers/vistos.controller");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", JWTMiddleware_1.addUserReq, vistos_controller_1.getRecientesByUser);
router.post("/agregar", JWTMiddleware_1.addUserReq, vistos_controller_1.registrarReciente);
exports.default = router;
//# sourceMappingURL=vistos.routes.js.map