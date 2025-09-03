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
const jwt_1 = __importDefault(require("../utils/jwt"));
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
        try {
            // Intentar verificar el token actual
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
        catch (tokenError) {
            // Si el token expiró, intentar renovar automáticamente
            if (tokenError.name === "TokenExpiredError") {
                try {
                    console.log("🔄 Token expirado, intentando renovar automáticamente...");
                    // Decodificar el token expirado para obtener el userId (sin verificar)
                    const expiredDecoded = jsonwebtoken_1.default.decode(token);
                    if (!expiredDecoded || !expiredDecoded.id) {
                        return res.status(401).json({ message: "Token inválido" });
                    }
                    // Buscar el usuario y verificar que tenga una sesión válida reciente
                    const user = await database_1.default.usuario.findUnique({
                        where: { id: expiredDecoded.id },
                    });
                    if (!user) {
                        return res.status(404).json({ message: "Usuario no encontrado." });
                    }
                    // Obtener el rol para el nuevo token
                    const role = await database_1.default.rol.findFirst({
                        where: { id: user.rol_id },
                    });
                    // Generar nuevo token con la misma duración que el original
                    const newToken = await (0, jwt_1.default)({
                        id: user.id,
                        role: role?.nombre !== undefined ? role.nombre : "",
                    });
                    // Actualizar la cookie con el nuevo token
                    // Detectar si era mantenerConexion basado en la duración original
                    const shouldMaintainConnection = true; // Por defecto mantener conexión para usuarios regulares
                    res.cookie("token", newToken, {
                        sameSite: "lax",
                        secure: false,
                        httpOnly: true,
                        domain: process.env.COOKIE_DOMAIN,
                        maxAge: shouldMaintainConnection
                            ? 30 * 24 * 60 * 60 * 1000
                            : 2 * 60 * 60 * 1000,
                    });
                    console.log("✅ Token renovado automáticamente para usuario:", user.id);
                    req.user = user;
                    next();
                }
                catch (renewError) {
                    console.error("❌ Error al renovar token automáticamente:", renewError);
                    return res.status(401).json({
                        message: "Sesión expirada, inicia sesión nuevamente",
                    });
                }
            }
            else if (tokenError.name === "JsonWebTokenError") {
                // Token completamente inválido
                return res.status(401).json({ message: "Token inválido" });
            }
            else {
                // Otros errores de token
                return res.status(401).json({ message: "Error de autenticación" });
            }
        }
    }
    catch (error) {
        console.error("Error en attachUser middleware:", error);
        return res
            .status(500)
            .json({ message: "Error al autenticar usuario.", error: error.message });
    }
};
exports.addUserReq = addUserReq;
//# sourceMappingURL=JWTMiddleware.js.map