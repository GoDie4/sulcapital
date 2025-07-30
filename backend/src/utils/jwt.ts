import { ENV } from "../config/config";
import jwt from "jsonwebtoken";

export interface JWTPayload {
  id: number | string;
  role: number | string;
}

export default function createAccessToken(payload: JWTPayload) {
  console.log("🛠️ Creando access token...");
  console.log("Payload:", payload);
  console.log("TOKEN_SECRET:", ENV.TOKEN_SECRET ? "[OK]" : "[❌ NO DEFINIDO]");

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      ENV.TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err: any, token: any) => {
        if (err) {
          console.error("❌ Error al firmar el token JWT:", err);
          return reject(err);
        }

        console.log("✅ Token generado correctamente");
        resolve(token);
      }
    );
  });
}