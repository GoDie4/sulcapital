"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JWTMiddleware_1 = require("../middlewares/JWTMiddleware");
const favoritos_controller_1 = require("../controllers/favoritos.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/byUser", JWTMiddleware_1.addUserReq, favoritos_controller_1.getFavoritosByUser);
router.post("/agregar", JWTMiddleware_1.addUserReq, favoritos_controller_1.agregarFavorito);
router.delete("/eliminar", JWTMiddleware_1.addUserReq, favoritos_controller_1.eliminarFavorito);
exports.default = router;
//# sourceMappingURL=favoritos.routes.js.map