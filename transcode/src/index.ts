import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/s3", express.static(path.join(__dirname, "../s3")));

app.get("/", (_req, res) => {
  res.json({ hello: "world" });
});

app.listen(3000, () => console.log("listening on 3000"));

export default app;
