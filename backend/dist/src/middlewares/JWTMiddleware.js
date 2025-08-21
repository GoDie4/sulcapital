"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserReq = exports.verifyCliente = exports.verifyAnuncianteOrCliente = exports.verifyAdminAndAnunciante = exports.verifyAnunciante = exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../config/config");
const database_1 = __importDefault(require("../config/database"));
dotenv_1.default.config();
const verifyAdmin = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        const user = await database_1.default.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        if (user?.rol_id !== 1) {
            return res
                .status(403)
                .json({ message: "No tienes permisos de administrador." });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Token inválido." });
    }
};
exports.verifyAdmin = verifyAdmin;
const verifyAnunciante = async (req, res, next) => {
    const tokenFromCookie = req.cookies?.token;
    const token = tokenFromCookie;
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        const user = await database_1.default.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado." });
            return;
        }
        if (user?.rol_id !== 2) {
            res.status(403).json({ message: "No tienes permisos de anunciante." });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido." });
        return;
    }
};
exports.verifyAnunciante = verifyAnunciante;
const verifyAdminAndAnunciante = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.ENV.TOKEN_SECRET);
        const user = await database_1.default.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        const allowedRoles = [1, 2];
        if (!allowedRoles.includes(user.rol_id)) {
            return res.status(403).json({
                message: "Acceso denegado. Se requieren permisos de administrador o anunciante.",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error al verificar token:", error);
        return res.status(401).json({ message: "Token inválido o expirado." });
    }
};
exports.verifyAdminAndAnunciante = verifyAdminAndAnunciante;
const verifyAnuncianteOrCliente = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.ENV.TOKEN_SECRET);
        const user = await database_1.default.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        const allowedRoles = [2, 3];
        if (!allowedRoles.includes(user.rol_id)) {
            return res.status(403).json({
                message: "Acceso denegado. Se requieren permisos de anunciante o cliente",
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error al verificar token:", error);
        return res.status(401).json({ message: "Token inválido o expirado." });
    }
};
exports.verifyAnuncianteOrCliente = verifyAnuncianteOrCliente;
const verifyCliente = async (req, res, next) => {
    const tokenFromCookie = req.cookies?.token;
    const token = tokenFromCookie;
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        const user = await database_1.default.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado." });
            return;
        }
        if (user?.rol_id !== 3) {
            res.status(403).json({ message: "No tienes permisos de cliente." });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido." });
        return;
    }
};
exports.verifyCliente = verifyCliente;
const addUserReq = async (req, res, next) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res
                .status(401)
                .json({ message: "Token no encontrado en cookies." });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        const user = await database_1.default.usuario.findUnique({
            where: { id: decoded.id },
        });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("Error en attachUser middleware:", error);
        // Detectar token vencido
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expirado" });
        }
        // Detectar token inválido
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token inválido" });
        }
        // Otros errores
        return res
            .status(500)
            .json({ message: "Error al autenticar usuario.", error: error.message });
    }
};
exports.addUserReq = addUserReq;
//# sourceMappingURL=JWTMiddleware.js.map