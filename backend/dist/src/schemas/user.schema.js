"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cambiarContrasenaPerfilSchema = void 0;
const zod_1 = require("zod");
exports.cambiarContrasenaPerfilSchema = zod_1.z
    .object({
    newPassword: zod_1.z
        .string({ required_error: "La nueva contraseña es requerida" })
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmNewPassword: zod_1.z.string({
        required_error: "La confirmación de contraseña es requerida",
    }),
})
    .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmNewPassword"],
});
//# sourceMappingURL=user.schema.js.map