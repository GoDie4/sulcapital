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
    NODE_ENV: process.env.NODE_ENV || "production",
    TOKEN_SECRET: process.env.TOKEN_SECRET || "SULCAPITAL__LOGOSPERU_2025",
    WEB_URL: process.env.WEB_URL,
    PORT: process.env.SERVER_PORT || "5000",
    DATABASE_URL: process.env.DATABASE_URL || "mysql://sulcapit_sulcapital:j]XG@.jiHI5OJ4DG@localhost:3306/sulcapit_sulcapital",
    EMAIL_HOST: process.env.HOST_MAIL || "mail.sulcapital.pe",
    EMAIL_PORT: process.env.PUERTO_EMAIL || 465,
    EMAIL_SECURE: process.env.SECURE_MAIL || true,
    EMAIL_USER: process.env.USER_MAIL || "notificaciones@sulcapital.pe",
    EMAIL_PASS: process.env.PASS_MAIL || "__7oq{k]w$651W{p",
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || ".sulcapital.pe",
    ADMIN_EMAIL: process.env.EMAIL_ADMIN || "anthony10.reyes10@gmail.com",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "423658883073-v0tuq1ntdbvglqsl9e95ibelrdr95o9u.apps.googleusercontent.com",
};
//# sourceMappingURL=config.js.map