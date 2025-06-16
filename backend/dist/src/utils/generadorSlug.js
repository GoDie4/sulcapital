"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarSlug = void 0;
const generarSlug = (texto) => texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
exports.generarSlug = generarSlug;
//# sourceMappingURL=generadorSlug.js.map