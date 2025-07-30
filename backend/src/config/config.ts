import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "production",
  TOKEN_SECRET: process.env.TOKEN_SECRET || "SULCAPITAL__LOGOSPERU_2025",
  WEB_URL: process.env.WEB_URL,
  PORT: process.env.SERVER_PORT || "5000",
  DATABASE_URL: process.env.DATABASE_URL || "mysql://sulcapit_sulcapital:j]XG@.jiHI5OJ4DG@localhost:3306/sulcapit_sulcapital",
  EMAIL_HOST: process.env.HOST_MAIL || "",
  EMAIL_PORT: process.env.PUERTO_EMAIL || "",
  EMAIL_SECURE: process.env.SECURE_MAIL || "",
  EMAIL_USER: process.env.USER_MAIL || "",
  EMAIL_PASS: process.env.PASS_MAIL || "",
  COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || ".sulcapital.pe",
  ADMIN_EMAIL: process.env.EMAIL_ADMIN || "anthony10.reyes10@gmail.com",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "423658883073-v0tuq1ntdbvglqsl9e95ibelrdr95o9u.apps.googleusercontent.com",
};
