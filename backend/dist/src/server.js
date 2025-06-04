"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// 1) Permitir cualquier origen, pero manteniendo credentials (cookies)
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Con callback(null, true) siempre permites el origen que venga,
        // incluso si origin === undefined (por Postman, etc.).
        callback(null, true);
    },
    credentials: true, // para que el navegador acepte cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// 2) Asegurar que cualquier OPTIONS reciba los mismos headers
app.options("*", (0, cors_1.default)({
    origin: true, // true equivale a “permitir siempre”
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// 5) Middleware adicional para debugging CORS
app.use((req, res, next) => {
    console.log("Request Origin:", req.headers.origin);
    console.log("Request Method:", req.method);
    console.log("Request Headers:", req.headers);
    next();
});
// 4) Ahora montas tus otros middlewares:
app.use("/public", express_1.default.static(path_1.default.resolve("public")));
app.use(express_1.default.json());
exports.default = app;
//# sourceMappingURL=server.js.map