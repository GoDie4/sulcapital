"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAlumnoNoCookie = exports.verifyUser = exports.verifyAdminOrProfesor = exports.verifyAlumnoOrProfesor = exports.verifyProfesor = exports.verifyAlumno = exports.verifyAdmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = require("../config/config");
const database_1 = __importDefault(require("../config/database"));
dotenv_1.default.config();
const verifyAdmin = async (req, res, next) => {
    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        const user = await database_1.default.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        if (user?.rol_id !== 1) {
            return res.status(403).json({ message: "No tienes permisos de administrador." });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Token inválido." });
    }
};
exports.verifyAdmin = verifyAdmin;
const verifyAlumno = async (req, res, next) => {
    const tokenFromCookie = req.cookies?.token;
    const token = tokenFromCookie;
    console.log("Cookies:", req.cookies?.token);
    console.log("BODY: ", req.body);
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
            res.status(403).json({ message: "No tienes permisos de alumno." });
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
exports.verifyAlumno = verifyAlumno;
const verifyProfesor = async (req, res, next) => {
    console.log(req.headers.authorization);
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        console.log(decoded);
        const user = await database_1.default.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado." });
        }
        if (user?.rol_id !== 3) {
            res.status(403).json({ message: "No tienes permisos de profesor." });
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido." });
    }
};
exports.verifyProfesor = verifyProfesor;
const verifyAlumnoOrProfesor = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
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
        if (user?.rol_id !== 2 && user?.rol_id !== 3) {
            res
                .status(403)
                .json({ message: "No tienes permisos de alumno o profesor." });
            return;
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        console.error("Error al verificar el rol de usuario:", error);
        res.status(500).json({ message: "Error al verificar el rol de usuario" });
        return;
    }
};
exports.verifyAlumnoOrProfesor = verifyAlumnoOrProfesor;
const verifyAdminOrProfesor = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
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
        if (user?.rol_id !== 1 && user?.rol_id !== 3) {
            res
                .status(403)
                .json({ message: "No tienes permisos de administrador o profesor." });
            return;
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        console.error("Error al verificar el rol de usuario:", error);
        res.status(500).json({ message: "Error al verificar el rol de usuario" });
        return;
    }
};
exports.verifyAdminOrProfesor = verifyAdminOrProfesor;
const verifyUser = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        const user = await database_1.default.usuario.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        console.error("Error al verificar el rol de usuario:", error);
        res.status(500).json({ message: "Error al verificar el rol de usuario" });
        return;
    }
};
exports.verifyUser = verifyUser;
const verifyAlumnoNoCookie = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).json({ message: "Token no proporcionado." });
        return;
    }
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ message: "Token no proporcionado." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token ?? "", config_1.ENV.TOKEN_SECRET);
        const user = await database_1.default.usuario.findUnique({
            where: { id: decoded.id },
            include: { rol: true },
        });
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        if (user?.rol_id !== 2) {
            res.status(403).json({ message: "No tienes permiso de alumno" });
            return;
        }
        req.user = user; // Agrega el usuario decodificado a la solicitud
        next();
    }
    catch (error) {
        console.error("Error al verificar el rol de usuario:", error);
        res.status(500).json({ message: "Error al verificar el rol de usuario" });
        return;
    }
};
exports.verifyAlumnoNoCookie = verifyAlumnoNoCookie;
//# sourceMappingURL=JWTMiddleware.js.map