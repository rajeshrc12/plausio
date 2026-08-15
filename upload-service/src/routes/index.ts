import { Router } from "express";

import authRoutes from "../routes/auth.js";
import redisRoutes from "../routes/redis.js";
import userRoutes from "./user.js";
import adminRoutes from "./admin.js";
import movieRoutes from "./movie.js";
import {
  authenticateAdminToken,
  authenticateToken,
} from "../utils/middleware.js";

const router = Router();

router.use("/redis", redisRoutes);
router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/user", authenticateToken, userRoutes);
router.use("/movie", authenticateAdminToken, movieRoutes);

export default router;
