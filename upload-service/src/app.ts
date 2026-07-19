import express from "express";
import { prisma } from "./lib/prisma.js";

const app = express();

app.use(express.json());

app.get("/", async (_, res) => {
  const user = await prisma.user.findMany();
  res.status(200).json({ hello: "world", user });
});

export default app;
