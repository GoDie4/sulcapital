"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const config_1 = require("./config/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const user_routes_1 = __importDefault(require("../src/routes/user.routes"));
const auth_routes_1 = __importDefault(require("../src/routes/auth.routes"));
const ciudades_routes_1 = __importDefault(require("../src/routes/ciudades.routes"));
const tipoPropiedad_routes_1 = __importDefault(require("../src/routes/tipoPropiedad.routes"));
const propiedades_routes_1 = __importDefault(require("../src/routes/propiedades.routes"));
const favoritos_routes_1 = __importDefault(require("../src/routes/favoritos.routes"));
const vistos_routes_1 = __importDefault(require("../src/routes/vistos.routes"));
const contacto_routes_1 = __importDefault(require("../src/routes/contacto.routes"));
const banners_routes_1 = __importDefault(require("../src/routes/banners.routes"));
server_1.default.use(express_1.default.static("public"));
server_1.default.use((0, cookie_parser_1.default)());
database_1.default
    .$connect()
    .then(() => {
    console.log("✅ Conectado a la base de datos");
    server_1.default.listen(config_1.ENV.PORT, () => {
        console.log(`🚀 Server corriendo en http://localhost:${config_1.ENV.PORT}`);
    });
})
    .catch((error) => {
    console.error("❌ Error al conectar a la base de datos:", error);
    process.exit(1);
});
server_1.default.use("/api", auth_routes_1.default);
server_1.default.use("/api/user", user_routes_1.default);
server_1.default.use("/api/ciudades", ciudades_routes_1.default);
server_1.default.use("/api/banners", banners_routes_1.default);
server_1.default.use("/api/tipo_propiedades", tipoPropiedad_routes_1.default);
server_1.default.use("/api/propiedades", propiedades_routes_1.default);
server_1.default.use("/api/favoritos", favoritos_routes_1.default);
server_1.default.use("/api/vistos", vistos_routes_1.default);
server_1.default.use("/api/contacto", contacto_routes_1.default);
// 🔴 Manejar desconexión limpia al cerrar el proceso
process.on("SIGINT", async () => {
    console.log("\n🧹 Cerrando conexión a la base de datos...");
    await database_1.default.$disconnect();
    console.log("✅ Prisma desconectado. Adiós!");
    process.exit(0);
});
process.on("SIGTERM", async () => {
    console.log("\n🧹 Cerrando conexión a la base de datos...");
    await database_1.default.$disconnect();
    console.log("✅ Prisma desconectado. Adiós!");
    process.exit(0);
});
//# sourceMappingURL=index.js.map