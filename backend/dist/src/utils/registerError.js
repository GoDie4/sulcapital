"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarError = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logFilePath = path_1.default.join(__dirname, "../..", "src", "error.log");
const registrarError = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs_1.default.appendFileSync(logFilePath, logMessage, "utf8");
};
exports.registrarError = registrarError;
//# sourceMappingURL=registerError.js.map