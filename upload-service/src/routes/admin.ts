import { Router } from "express";
import { getMe, login } from "../controllers/admin.js";
import { authenticateAdminToken } from "../utils/middleware.js";

const router = Router();

router.post("/login", login);
router.get("/me", authenticateAdminToken, getMe);

export default router;
