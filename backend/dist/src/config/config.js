"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
exports.ENV = {
    NODE_ENV: process.env.NODE_ENV || "desarrollo",
    TOKEN_SECRET: process.env.TOKEN_SECRET || "",
    WEB_URL: process.env.WEB_URL,
    PORT: process.env.SERVER_PORT || "5000",
    DATABASE_URL: process.env.DATABASE_URL || "",
    EMAIL_HOST: process.env.HOST_MAIL || "",
    EMAIL_PORT: process.env.PUERTO_EMAIL || "",
    EMAIL_SECURE: process.env.SECURE_MAIL || "",
    EMAIL_USER: process.env.USER_MAIL || "",
    EMAIL_PASS: process.env.PASS_MAIL || "",
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "localhost",
    ADMIN_EMAIL: process.env.EMAIL_ADMIN || "",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
};
//# sourceMappingURL=config.js.map