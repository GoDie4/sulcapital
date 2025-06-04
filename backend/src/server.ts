import express from "express";
import cors from "cors";
import path from "path";

const app = express();
app.use(
  cors({
    origin: "https://sulcapital.exportando.online",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Y también para OPTIONS, aunque express-cors ya lo cubre:
app.options(
  "*",
  cors({
    origin: "https://sulcapital.exportando.online",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use("/public", express.static(path.resolve("public")));

app.use(express.json());

export default app;
