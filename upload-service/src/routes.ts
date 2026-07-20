import { Router } from "express";
import { pool } from "./db.js";

const router = Router();

router.get("/", async (_, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users ORDER BY id ASC");

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});
router.post("/users", async (req, res) => {
  try {
    const { name } = req.body;

    const { rows } = await pool.query(
      "INSERT INTO users(name) VALUES($1) RETURNING *",
      [name],
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});
export default router;
