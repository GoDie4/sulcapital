"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = void 0;
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authRequired = (req, res, next) => {
    let token = req.cookies.token;
    if (!token &&
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token)
        return res.status(400).json({ message: "Autorización denegada" });
    jsonwebtoken_1.default.verify(token, config_1.ENV.TOKEN_SECRET, (err, user) => {
        if (err)
            return res.status(401).json({ message: "Token inválido" });
        req.user = user;
        next();
    });
};
exports.authRequired = authRequired;
//# sourceMappingURL=validateToken.js.map