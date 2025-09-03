"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const validateSchema = (schema) => (req, res, next) => {
    try {
        console.log(req.body);
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                message: "Error de validación",
                errors: error.errors.map((err) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });
            return;
        }
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
exports.validateSchema = validateSchema;
//# sourceMappingURL=validatorSchemas.middleware.js.map