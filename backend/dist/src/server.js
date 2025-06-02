"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://localhost:4000",
        "http://192.168.0.100:3000",
    ],
    credentials: true,
}));
app.use("/public", express_1.default.static(path_1.default.resolve("public")));
app.use(express_1.default.json());
exports.default = app;
//# sourceMappingURL=server.js.map