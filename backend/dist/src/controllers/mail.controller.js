"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarLibroReclamacionMail = exports.sendEmail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const config_1 = require("../config/config");
// Usar process.cwd() para obtener la raíz del proyecto
const rootDir = process.cwd();
const uploadDir = path_1.default.join(rootDir, "src/mail");
const logFilePath = path_1.default.join(rootDir, "src", "error.log");
// Función para escribir en el log
const writeLog = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    fs_1.default.appendFileSync(logFilePath, logMessage, "utf8");
};
exports.transporter = nodemailer_1.default.createTransport({
    //@ts-ignore
    host: config_1.ENV.EMAIL_HOST,
    port: config_1.ENV.EMAIL_PORT,
    secure: config_1.ENV.EMAIL_SECURE,
    auth: {
        user: config_1.ENV.EMAIL_USER,
        pass: config_1.ENV.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendEmail = async (to, subject, templateName, replacements) => {
    try {
        const templatePath = path_1.default.join(uploadDir, templateName);
        console.log(`Ruta de la plantilla de correo: ${templatePath}`);
        if (!fs_1.default.existsSync(templatePath)) {
            throw new Error(`La plantilla de correo no existe en: ${templatePath}`);
        }
        const source = fs_1.default.readFileSync(templatePath, "utf-8").toString();
        const template = handlebars_1.default.compile(source);
        const htmlToSend = template(replacements);
        if (Array.isArray(to)) {
            to = to.join(", ");
        }
        await exports.transporter.sendMail({
            from: config_1.ENV.EMAIL_USER,
            to,
            subject,
            html: htmlToSend,
        });
        writeLog(`Correo enviado a: ${to} | Asunto: ${subject}`);
        return true;
    }
    catch (error) {
        writeLog(`Error al enviar correo a: ${to} | Asunto: ${subject} | Detalle: ${error.message}`);
        console.error("Error enviando correo:", error);
        return false;
    }
};
exports.sendEmail = sendEmail;
const enviarLibroReclamacionMail = async (req, res) => {
    const data = req.body;
    console.log("data: ", data);
    try {
        const soporteEmail = await exports.transporter.sendMail({
            from: `"Nuevo Reclamo" <notificaciones@cencapperu.com>`,
            to: process.env.EMAIL_USER,
            subject: "Nuevo Reclamo Registrado",
            html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
              <h2 style="color: #2c3e50; border-bottom: 1px solid #eee; padding-bottom: 10px;">📄 Libro de Reclamaciones</h2>
              <p><strong>Nombre:</strong> ${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}</p>
              <p><strong>Correo:</strong> ${data.correo}</p>
              <p><strong>Teléfono:</strong> ${data.telefono}</p>
              <p><strong>Dirección:</strong> ${data.direccion}, ${data.distrito}, ${data.provincia}, ${data.departamento}</p>
              <p><strong>Monto reclamado:</strong> S/. ${data.monto}</p>
              <p><strong>Descripción:</strong> ${data.descripcion || "(Sin descripción)"}</p>
              <p><strong>Detalle del reclamo:</strong></p>
              <p style="white-space: pre-line;">${data.detalleReclamo}</p>
            </div>
          </div>
        `,
        });
        // Si el envío fue exitoso, envía el segundo correo al cliente
        if (soporteEmail.accepted.length > 0) {
            await (0, exports.sendEmail)(data.correo, "Reclamo enviado", `/reclamaciones/ReclamoEnviado.html`, {
                nombre: data.nombre,
            });
        }
        res.status(200).json({ message: "Reclamación enviada correctamente" });
    }
    catch (error) {
        console.error("Error al enviar correo:", error);
        res.status(500).json({ message: "Error al enviar correo", error });
    }
};
exports.enviarLibroReclamacionMail = enviarLibroReclamacionMail;
//# sourceMappingURL=mail.controller.js.map