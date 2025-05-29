import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const ENV = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || '',
  WEB_URL: process.env.WEB_URL,
  PORT: process.env.SERVER_PORT || "5000",
  DATABASE_URL: process.env.DATABASE_URL || "",
  EMAIL_HOST: process.env.HOST_MAIL || "",
  EMAIL_PORT: process.env.PUERTO_EMAIL || "",
  EMAIL_SECURE: process.env.SECURE_MAIL || "",
  EMAIL_USER: process.env.USER_MAIL || "",
  EMAIL_PASS: process.env.PASS_MAIL || "",
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || "localhost",
};
