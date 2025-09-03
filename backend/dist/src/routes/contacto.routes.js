"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contacto_controller_1 = require("../controllers/contacto.controller");
const express_1 = require("express");
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const router = (0, express_1.Router)();
router.get("/", contacto_controller_1.getEmpresaContacto);
router.post("/", JWTMiddleware_1.verifyAdmin, contacto_controller_1.upsertEmpresaContacto);
exports.default = router;
//# sourceMappingURL=contacto.routes.js.map