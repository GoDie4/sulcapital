"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambiarContrasenaSchema = exports.recuperarSchema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    nombres: zod_1.z.string({
        required_error: "Nombres requeridos",
    }),
    apellidos: zod_1.z.string({
        required_error: "Apellidos requeridos",
    }),
    celular: zod_1.z
        .string({
        required_error: "Celular requerido",
    })
        .min(6, {
        message: "El celular debe tener mínimo 6 caracteres",
    })
        .max(15, {
        message: "El celular tiene un máximo de 15 caracteres",
    }),
    email: zod_1.z
        .string({
        required_error: "Correo electrónico requerido",
    })
        .email({
        message: "Correo inválido",
    }),
    password: zod_1.z
        .string({
        required_error: "Contraseña requerida",
    })
        .min(8, {
        message: "La contraseña debe tener mínimo 8 caracteres",
    }),
    rol: zod_1.z.string({
        required_error: "Rol requerido",
    }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "El correo es requreido",
    }),
    password: zod_1.z.string({
        required_error: "La contraseña es requerida",
    }),
});
exports.recuperarSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "El correo es requreido",
    }),
});
exports.cambiarContrasenaSchema = zod_1.z.object({
    newPassword: zod_1.z.string({
        required_error: "La contraseña es requerida",
    }),
});
//# sourceMappingURL=auth.schema.js.map