import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.options("*", cors({
    origin: function (origin, callback) {
      const allowed = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://localhost:4000",
        "https://sulcapital.exportando.online",
        "https://www.sulcapital.exportando.online",
      ];
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }));

app.use("/public", express.static(path.resolve("public")));

app.use(express.json());

export default app;
