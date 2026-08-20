import { Router } from "express";
import { getDashboard, getMe, login } from "../controllers/admin.js";
import { authenticateAdminToken } from "../utils/middleware.js";

const router = Router();

router.post("/login", login);
router.get("/me", authenticateAdminToken, getMe);
router.get("/dashboard", authenticateAdminToken, getDashboard);

export default router;
