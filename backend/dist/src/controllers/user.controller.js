"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecodedUser = exports.cambiarContrasenaPerfil = exports.editarPerfil = exports.yo = exports.profile = exports.getUltimosUsuarios = exports.getUsuarios = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("../config/database"));
const getUsuarios = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const search = req.query.search?.trim() || "";
    const skip = (page - 1) * limit;
    const searchLower = search.toLowerCase();
    const rol = req.query.rol?.trim() || "";
    const estado = req.query.estado?.trim() || "";
    const publicaciones = req.query.publicaciones?.trim() || "";
    const whereConditions = {};
    if (rol) {
        whereConditions.rol = {
            nombre: {
                contains: rol,
            },
        };
    }
    if (estado) {
        whereConditions.activo = estado === "1" ? true : false;
    }
    if (publicaciones === "1") {
        whereConditions.Propiedad = {
            some: {},
        };
    }
    if (searchLower) {
        whereConditions.OR = [
            { nombre: { contains: searchLower } },
            { correo: { contains: searchLower } },
            { username: { contains: searchLower } },
        ];
    }
    try {
        const [usuarios, total] = await Promise.all([
            database_1.default.usuario.findMany({
                skip,
                take: limit,
                where: whereConditions,
                include: {
                    rol: true,
                    Propiedad: true,
                },
                omit: {
                    password: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            }),
            database_1.default.usuario.count({
                where: whereConditions,
            }),
        ]);
        res.json({
            data: usuarios,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
    finally {
        await database_1.default.$disconnect();
    }
};
exports.getUsuarios = getUsuarios;
const getUltimosUsuarios = async (req, res) => {
    try {
        const usuarios = await database_1.default.usuario.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                rol: true,
                Propiedad: true,
            },
            omit: {
                password: true,
            },
        });
        res.json({ data: usuarios });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
    finally {
        await database_1.default.$disconnect();
    }
};
exports.getUltimosUsuarios = getUltimosUsuarios;
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
                apellidos: userEncontrado.apellidos,
                celular: userEncontrado.celular,
                avatarUrl: userEncontrado.avatarUrl,
                provider: userEncontrado.provider,
                email: userEncontrado.email,
                rol_id: userEncontrado.rol_id,
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
const editarPerfil = async (req, res) => {
    const userId = req.user?.id;
    const { nombres, apellidos, celular } = req.body;
    try {
        if (!nombres || !apellidos || !celular) {
            return res
                .status(400)
                .json({ error: "Falta nombres, apellidos o celular son obligatorios" });
        }
        const usuarioActualizado = await database_1.default.usuario.update({
            where: { id: userId },
            data: {
                nombres,
                apellidos,
                celular,
            },
        });
        res.json({
            message: "Perfil actualizado correctamente",
            usuario: usuarioActualizado,
        });
    }
    catch (error) {
        console.error("Error al actualizar perfil:", error.message);
        res.status(500).json({ error: error.message });
    }
};
exports.editarPerfil = editarPerfil;
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