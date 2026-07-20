import { Router } from "express";
import { prisma } from "./lib/prisma.js";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});
router.post("/user", async (req, res) => {
  try {
    const { name } = req.body;
    const user = await prisma.user.create({ data: { name } });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});
export default router;
