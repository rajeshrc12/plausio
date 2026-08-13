import { Router } from "express";
import { getMe } from "../controllers/user.js";
import { authenticateToken } from "../utils/middleware.js";

const router = Router();

router.get("/me", authenticateToken, getMe);

export default router;
