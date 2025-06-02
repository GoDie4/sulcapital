"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.cambiarContrasena = exports.recuperarContrasena = exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const mail_controller_1 = require("./mail.controller");
const config_1 = require("../config/config");
const database_1 = __importDefault(require("../config/database"));
const login = async (req, res) => {
    const { email, password, mantenerConexion } = req.body;
    try {
        const usuarioExiste = await database_1.default.usuario.findFirst({
            where: { email },
        });
        if (!usuarioExiste)
            return res.status(400).json({ message: "El usuario no existe" });
        const isMatch = await bcrypt_1.default.compare(password, usuarioExiste.password);
        if (!isMatch)
            return res.status(400).json({ message: "Contraseña incorrecta" });
        const token = await (0, jwt_1.default)({ id: usuarioExiste.id });
        res.cookie("token", token, {
            sameSite: "none", // "lax" funciona bien localmente
            secure: true, // false porque en localhost normalmente usas http
            httpOnly: true,
            domain: config_1.ENV.COOKIE_DOMAIN, // o simplemente omítelo en entorno local
            maxAge: mantenerConexion ? 30 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000,
        });
        const primerNombre = usuarioExiste.nombres.split(" ");
        res.json({
            message: `Bienvenido ${primerNombre[0]}`,
            usuario: {
                id: usuarioExiste.id,
                nombres: usuarioExiste.nombres,
                email: usuarioExiste.email,
                rol_id: usuarioExiste.rol_id,
            },
            status: 200,
            token: token,
        });
    }
    catch (error) {
        console.error("Error al iniciar sesión", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.login = login;
const register = async (req, res) => {
    const { nombres, apellidos, tipo_documento, documento, email, celular, password, rol, } = req.body;
    try {
        const existeUsuario = await database_1.default.usuario.findFirst({
            where: {
                OR: [{ email }, { documento }],
            },
        });
        if (existeUsuario) {
            return res.status(400).json({
                message: "El correo o documento ya están registrados",
            });
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        // Crear el usuario
        const nuevoUsuario = await database_1.default.usuario.create({
            data: {
                nombres,
                apellidos,
                tipo_documento,
                documento,
                email,
                celular,
                password: hashedPassword,
                activo: false,
                rol_id: rol === "ANUNCIANTE" ? 2 : 3,
            },
        });
        // Generar el token
        const token = await (0, jwt_1.default)({ id: nuevoUsuario.id });
        // Setear cookie
        res.cookie("token", token, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
            domain: config_1.ENV.COOKIE_DOMAIN,
            maxAge: 2 * 60 * 60 * 1000, // 2 horas
        });
        const primerNombre = nuevoUsuario.nombres.split(" ");
        res.json({
            message: `Bienvenido ${primerNombre[0]}`,
            usuario: {
                id: nuevoUsuario.id,
                nombres: nuevoUsuario.nombres,
                email: nuevoUsuario.email,
                rol_id: nuevoUsuario.rol_id,
            },
            status: 200,
            token: token,
        });
    }
    catch (error) {
        console.error("Error al registrar usuario", error);
        return res.status(500).json({
            message: "Error interno del servidor",
        });
    }
};
exports.register = register;
const recuperarContrasena = async (req, res) => {
    const { email } = req.body;
    const user = await database_1.default.usuario.findFirst({ where: { email } });
    if (!user)
        return res.status(404).json({ message: "Correo no registrado" });
    const token = crypto_1.default.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 1000 * 60 * 30);
    await database_1.default.passwordResetToken.create({
        data: {
            token,
            expiresAt: expires,
            userId: user.id,
        },
    });
    const resetLink = `http://localhost:3000/restablecer?token=${token}`;
    await (0, mail_controller_1.sendEmail)(user.email, "Recuperar contraseña", `RecuperarContrasena.html`, {
        enlace: resetLink,
        nombre: user.nombres.split(" ")[0],
    });
    res.json({
        message: "Te hemos enviado un enlace para restablecer tu contraseña.",
    });
};
exports.recuperarContrasena = recuperarContrasena;
const cambiarContrasena = async (req, res) => {
    const { token, newPassword } = req.body;
    const registro = await database_1.default.passwordResetToken.findUnique({
        where: { token },
    });
    if (!registro || registro.expiresAt < new Date()) {
        return res.status(400).json({ message: "Token inválido o expirado" });
    }
    const hashed = await bcrypt_1.default.hash(newPassword, 10);
    await database_1.default.usuario.update({
        where: { id: registro.userId },
        data: { password: hashed },
    });
    await database_1.default.passwordResetToken.delete({ where: { token } });
    res.json({ message: "Contraseña actualizada con éxito" });
};
exports.cambiarContrasena = cambiarContrasena;
const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });
    return res.sendStatus(200);
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map