import "dotenv/config";
import express from "express";
import router from "./routes.js";
import { initDB } from "./db.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/", router);

async function start() {
  try {
    await initDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start application:", err);
    process.exit(1);
  }
}

start();
