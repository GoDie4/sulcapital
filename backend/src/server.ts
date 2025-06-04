import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(
  cors({
    origin: "https://sulcapital.exportando.online",
    credentials: true,
  })
);

app.use("/public", express.static(path.resolve("public")));

app.use(express.json());

export default app;
