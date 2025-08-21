"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateToken_1 = require("../middlewares/validateToken");
const user_controller_1 = require("../controllers/user.controller");
const express_1 = require("express");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const validatorSchemas_middleware_1 = require("../middlewares/validatorSchemas.middleware");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_schema_1 = require("../schemas/auth.schema");
const router = (0, express_1.Router)();
router.get("", JWTMiddleware_1.verifyAdmin, user_controller_1.getDecodedUser);
router.get("/perfil/:userId", validateToken_1.authRequired, user_controller_1.profile);
router.put("/editarPerfil", JWTMiddleware_1.verifyAnuncianteOrCliente, user_controller_1.editarPerfil);
router.get("/yo", JWTMiddleware_1.addUserReq, user_controller_1.yo);
router.put("/cambiarContrasena/token", (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.cambiarContrasenaSchema), auth_controller_1.cambiarContrasenaConToken);
router.put("/cambiarContrasena/logueado", JWTMiddleware_1.addUserReq, (0, validatorSchemas_middleware_1.validateSchema)(auth_schema_1.cambiarContrasenaSchema), auth_controller_1.cambiarContrasenaLogueado);
router.post("/publicaciones-automaticas", JWTMiddleware_1.verifyAdmin, user_controller_1.actualizarPublicacionesAutomaticas);
exports.default = router;
//# sourceMappingURL=user.routes.js.map