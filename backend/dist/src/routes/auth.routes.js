"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validatorSchemas_middleware_1 = require("../middlewares/validatorSchemas.middleware");
const auth_schema_1 = require("../schemas/auth.schema");
const auth_controller_1 = require("../controllers/auth.controller");
const user_controller_1 = require("../controllers/user.controller");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const router = (0, express_1.Router)();
router.get("/listar-usuarios", user_controller_1.getUsuarios);
router.get("/ultimosUsuarios", JWTMiddleware_1.verifyAdmin, user_controller_1.getUltimosUsuarios);
router.post("/login", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.loginSchema), auth_controller_1.login);
router.post("/registro", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.registerSchema), auth_controller_1.register);
router.post("/recuperar", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.recuperarSchema), auth_controller_1.recuperarContrasena);
router.post("/logout", auth_controller_1.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map