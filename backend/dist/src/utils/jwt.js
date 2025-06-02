"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createAccessToken;
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, config_1.ENV.TOKEN_SECRET, {
            expiresIn: "1d",
        }, (err, token) => {
            if (err)
                reject();
            resolve(token);
        });
    });
}
//# sourceMappingURL=jwt.js.map