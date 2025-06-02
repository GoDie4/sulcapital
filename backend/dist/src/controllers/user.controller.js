"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecodedUser = exports.cambiarContrasenaPerfil = exports.yo = exports.profile = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../config/database"));
const profile = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await database_1.default.usuario.findUnique({
            where: { id: userId },
        });
        if (!user)
            return res.status(400).json({ message: "El usuario no existe" });
        return res.status(201).json({
            message: "Solicitud exitosa",
            usuario: {
                id: user.id,
                nombres: user.nombres,
                email: user.email,
            },
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error interno del servidor.", error: error.message });
    }
};
exports.profile = profile;
const yo = async (req, res) => {
    const userId = req.user?.id;
    try {
        const userEncontrado = await database_1.default.usuario.findUnique({
            where: { id: userId },
        });
        if (!userEncontrado)
            return res.status(400).json({ message: "El usuario no existe" });
        return res.status(201).json({
            message: "Solicitud exitosa",
            usuario: {
                id: userEncontrado.id,
                nombres: userEncontrado.nombres,
                email: userEncontrado.email,
            },
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error interno del servidor.", error: error.message });
    }
};
exports.yo = yo;
const cambiarContrasenaPerfil = async (req, res) => {
    const { newPassword } = req.body;
    const userId = req.user?.id;
    try {
        const hashed = await bcrypt_1.default.hash(newPassword, 10);
        await database_1.default.usuario.update({
            where: { id: userId },
            data: { password: hashed },
        });
        res.json({ message: "Contraseña actualizada con éxito" });
    }
    catch (error) {
        console.error("Error al actualizar perfil:", error.message);
        res.status(500).json({ error: error.message });
    }
    finally {
        database_1.default.$disconnect();
    }
};
exports.cambiarContrasenaPerfil = cambiarContrasenaPerfil;
const getDecodedUser = async (req, res) => {
    try {
        const user = req.user;
        console.log(user);
        if (!user) {
            return res
                .status(404)
                .json({ message: "Usuario no encontrado en la solicitud." });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error al obtener usuario decodificado:", error);
        return res
            .status(500)
            .json({ message: "Error interno del servidor.", error: error.message });
    }
    finally {
        database_1.default.$disconnect();
    }
};
exports.getDecodedUser = getDecodedUser;
//# sourceMappingURL=user.controller.js.map