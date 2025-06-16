"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsertEmpresaContacto = exports.getEmpresaContacto = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getEmpresaContacto = async (req, res) => {
    try {
        const contacto = await prisma.empresaContacto.findFirst({
            include: {
                CorreoEmpresa: true,
                TelefonoEmpresa: true,
            },
        });
        if (!contacto) {
            return res.status(404).json({
                status: "error",
                message: "No se encontraron datos de contacto",
            });
        }
        return res.status(200).json({
            status: "success",
            contacto,
        });
    }
    catch (error) {
        console.error("Error al obtener contacto:", error);
        return res.status(500).json({
            status: "error",
            message: "Error al obtener datos de contacto",
        });
    }
};
exports.getEmpresaContacto = getEmpresaContacto;
const upsertEmpresaContacto = async (req, res) => {
    try {
        const { facebook, instagram, twitter, tiktok, youtube, linkedin, whatsapp, direccion, horarios, correos, telefonos, } = req.body;
        // Verifica si ya existe un registro
        const existente = await prisma.empresaContacto.findFirst();
        if (existente) {
            // Actualizar
            const actualizado = await prisma.empresaContacto.update({
                where: { id: existente.id },
                data: {
                    facebook,
                    instagram,
                    twitter,
                    tiktok,
                    youtube,
                    linkedin,
                    whatsapp,
                    direccion,
                    horarios,
                    CorreoEmpresa: {
                        deleteMany: {},
                        create: correos,
                    },
                    TelefonoEmpresa: {
                        deleteMany: {},
                        create: telefonos,
                    },
                },
                include: {
                    CorreoEmpresa: true,
                    TelefonoEmpresa: true,
                },
            });
            return res.status(200).json(actualizado);
        }
        else {
            // Crear nuevo
            const creado = await prisma.empresaContacto.create({
                data: {
                    facebook,
                    instagram,
                    twitter,
                    tiktok,
                    youtube,
                    linkedin,
                    whatsapp,
                    direccion,
                    horarios,
                    CorreoEmpresa: {
                        create: correos,
                    },
                    TelefonoEmpresa: {
                        create: telefonos,
                    },
                },
                include: {
                    CorreoEmpresa: true,
                    TelefonoEmpresa: true,
                },
            });
            return res.status(201).json(creado);
        }
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ error: "Error al guardar datos de contacto." });
    }
};
exports.upsertEmpresaContacto = upsertEmpresaContacto;
//# sourceMappingURL=contacto.controller.js.map