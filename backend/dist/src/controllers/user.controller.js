"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarPublicacionesAutomaticas = exports.getDecodedUser = exports.cambiarContrasenaPerfil = exports.editarPerfil = exports.yo = exports.profile = exports.getUltimosUsuarios = exports.getUsuarios = void 0;
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
    const publicaciones = req.query.cant_publicaciones?.trim() || "";
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
    if (searchLower) {
        whereConditions.OR = [
            { nombres: { contains: searchLower } },
            { apellidos: { contains: searchLower } },
            { email: { contains: searchLower } },
            { celular: { contains: searchLower } },
        ];
    }
    try {
        let usuarios = await database_1.default.usuario.findMany({
            skip,
            take: limit,
            where: whereConditions,
            include: {
                rol: true,
                Propiedad: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        // Ordenamos según publicaciones si se solicita
        if (publicaciones === "1") {
            usuarios = usuarios.sort((a, b) => b.Propiedad.length - a.Propiedad.length); // Mayor a menor
        }
        else if (publicaciones === "0") {
            usuarios = usuarios.sort((a, b) => a.Propiedad.length - b.Propiedad.length); // Menor a mayor
        }
        const total = await database_1.default.usuario.count({ where: whereConditions });
        res.json({
            data: usuarios.map((usuario) => ({
                ...usuario,
                cant_publicaciones: usuario.Propiedad.length,
            })),
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
const actualizarPublicacionesAutomaticas = async (req, res) => {
    const { id, valor } = req.body;
    if (!id || (valor !== "si" && valor !== "no")) {
        return res.status(400).json({ message: "Datos inválidos" });
    }
    try {
        const usuario = await database_1.default.usuario.update({
            where: { id },
            data: {
                publicaciones_automaticas: valor === "si",
            },
        });
        res.json({
            mensaje: valor === "si"
                ? "Habilitado correctamente"
                : "Deshabilitado correctamente",
            data: usuario,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
    finally {
        await database_1.default.$disconnect();
    }
};
exports.actualizarPublicacionesAutomaticas = actualizarPublicacionesAutomaticas;
//# sourceMappingURL=user.controller.js.map