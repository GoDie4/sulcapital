"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// 1) Orígenes permitidos - incluye variaciones comunes
const allowedOrigins = [
    "https://sulcapital.exportando.online",
    "https://www.sulcapital.exportando.online", // Con www
    "http://localhost:3000", // Para desarrollo local
    "http://localhost:5173", // Para Vite
    "http://127.0.0.1:3000", // Para desarrollo local alternativo
];
// 2) Configuración CORS más permisiva para debugging
const corsOptions = {
    origin: function (origin, callback) {
        // Permite requests sin origin (como Postman, apps móviles, etc.)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            console.log("Origin bloqueado por CORS:", origin);
            callback(new Error("No permitido por CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
    ],
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
    maxAge: 86400, // 24 horas de caché para preflight
};
// 3) Middleware CORS ANTES que todo lo demás
app.use((0, cors_1.default)(corsOptions));
// 4) Manejo explícito de preflight para todas las rutas
app.options("*", (0, cors_1.default)(corsOptions));
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